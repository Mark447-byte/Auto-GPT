import unittest
from unittest.mock import patch, MagicMock
import subprocess
from buddybot.utils.system_check import check_ollama, check_model, check_microphone, check_tts

class TestSystemCheck(unittest.TestCase):

    @patch('subprocess.run')
    def test_check_ollama_success(self, mock_run):
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "0.1.30"
        mock_run.return_value = mock_result

        success, msg = check_ollama()
        self.assertTrue(success)
        self.assertIn("0.1.30", msg)

    @patch('subprocess.run')
    def test_check_ollama_failure(self, mock_run):
        mock_run.side_effect = FileNotFoundError()
        success, msg = check_ollama()
        self.assertFalse(success)
        self.assertIn("not found", msg)

    @patch('subprocess.run')
    def test_check_model_success(self, mock_run):
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "tinyllama:latest"
        mock_run.return_value = mock_result

        success, msg = check_model("tinyllama")
        self.assertTrue(success)
        self.assertIn("ready", msg)

    @patch('subprocess.run')
    def test_check_model_failure(self, mock_run):
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "llama2:latest"
        mock_run.return_value = mock_result

        success, msg = check_model("tinyllama")
        self.assertFalse(success)
        self.assertIn("not found", msg)

    @patch('speech_recognition.Microphone.list_microphone_names')
    def test_check_microphone_found(self, mock_list):
        mock_list.return_value = ["Mic 1", "Mic 2"]
        success, msg = check_microphone()
        self.assertTrue(success)
        self.assertIn("detected", msg)

    @patch('speech_recognition.Microphone.list_microphone_names')
    def test_check_microphone_none(self, mock_list):
        mock_list.return_value = []
        success, msg = check_microphone()
        self.assertFalse(success)
        self.assertIn("No microphones", msg)

    @patch('pyttsx3.init')
    def test_check_tts_success(self, mock_init):
        mock_engine = mock_init.return_value
        mock_engine.getProperty.return_value = 180
        success, msg = check_tts()
        self.assertTrue(success)
        self.assertIn("successfully", msg)

    @patch('pyttsx3.init')
    def test_check_tts_failure(self, mock_init):
        mock_init.side_effect = Exception("TTS Init Error")
        success, msg = check_tts()
        self.assertFalse(success)
        self.assertIn("TTS Error", msg)

if __name__ == "__main__":
    unittest.main()
