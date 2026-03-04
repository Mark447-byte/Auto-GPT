import unittest
from unittest.mock import patch, MagicMock
import subprocess

from buddybot.core.llm import OllamaCLI
from buddybot.input.input_controller import InputController
from buddybot.core.stt import SpeechToText
from buddybot.core.tts import TextToSpeech

class TestBuddyBotPhase1(unittest.TestCase):

    # 1. Test LLM CLI Wrapper
    @patch('subprocess.run')
    def test_llm_generate_success(self, mock_run):
        # Mock successful subprocess run
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "Hello from TinyLlama!"
        mock_run.return_value = mock_result

        llm = OllamaCLI(model="tinyllama")
        response = llm.generate("Hi")

        self.assertEqual(response, "Hello from TinyLlama!")
        mock_run.assert_called_once_with(
            ["ollama", "run", "tinyllama", "Hi"],
            capture_output=True,
            text=True,
            timeout=40
        )

    @patch('subprocess.run')
    def test_llm_generate_timeout(self, mock_run):
        # Mock timeout
        mock_run.side_effect = subprocess.TimeoutExpired(cmd=["ollama"], timeout=40)

        llm = OllamaCLI(timeout=40)
        response = llm.generate("Hi")

        self.assertIn("timed out", response)

    # 2. Test Input Controller
    def test_input_controller_text(self):
        # Mocking input() for T selection and then text entry
        with patch('builtins.input', side_effect=['T', 'Hello']):
            ic = InputController()
            choice = ic.get_user_choice()
            text = ic.get_text_input()

            self.assertEqual(choice, 'T')
            self.assertEqual(text, 'Hello')

    @patch('buddybot.core.stt.SpeechToText')
    def test_input_controller_voice_success(self, mock_stt_class):
        # Mock voice service returning transcription
        mock_stt = mock_stt_class.return_value
        mock_stt.capture_and_transcribe.return_value = "Voice transcription"

        ic = InputController(voice_input_service=mock_stt)
        transcription = ic.get_voice_input()

        self.assertEqual(transcription, "Voice transcription")

    @patch('buddybot.core.stt.SpeechToText')
    def test_input_controller_voice_fallback(self, mock_stt_class):
        # Mock voice service failure
        mock_stt = mock_stt_class.return_value
        mock_stt.capture_and_transcribe.return_value = None

        with patch('builtins.input', return_value="Fallback text"):
            ic = InputController(voice_input_service=mock_stt)
            # Should fall back to get_text_input() when transcription is None
            result = ic.get_voice_input()

            self.assertEqual(result, "Fallback text")

    # 3. Test STT Wrapper
    @patch('speech_recognition.Microphone')
    @patch('speech_recognition.Recognizer')
    def test_stt_capture_success(self, mock_recognizer_class, mock_mic_class):
        mock_recognizer = mock_recognizer_class.return_value
        mock_recognizer.recognize_google.return_value = "transcribed speech"

        stt = SpeechToText()
        result = stt.capture_and_transcribe()

        self.assertEqual(result, "transcribed speech")

    # 4. Test TTS Wrapper
    @patch('pyttsx3.init')
    def test_tts_initialization(self, mock_init):
        mock_engine = mock_init.return_value
        tts = TextToSpeech()

        self.assertIsNotNone(tts.engine)
        mock_init.assert_called_once()
        mock_engine.setProperty.assert_called_with('rate', 180)

if __name__ == '__main__':
    unittest.main()
