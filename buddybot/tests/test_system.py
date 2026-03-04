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

        self.assertTrue(check_ollama())
        mock_run.assert_called_with(["ollama", "--version"], capture_output=True, text=True)

    @patch('subprocess.run')
    def test_check_ollama_failure(self, mock_run):
        mock_run.side_effect = FileNotFoundError()
        self.assertFalse(check_ollama())

    @patch('subprocess.run')
    def test_check_model_success(self, mock_run):
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "tinyllama:latest"
        mock_run.return_value = mock_result

        self.assertTrue(check_model("tinyllama"))
        mock_run.assert_called_with(["ollama", "list"], capture_output=True, text=True)

    @patch('subprocess.run')
    def test_check_model_failure(self, mock_run):
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = "llama2:latest"
        mock_run.return_value = mock_result

        self.assertFalse(check_model("tinyllama"))

    @patch('speech_recognition.Microphone.list_microphone_names')
    def test_check_microphone_found(self, mock_list):
        mock_list.return_value = ["Mic 1", "Mic 2"]
        self.assertTrue(check_microphone())

    @patch('speech_recognition.Microphone.list_microphone_names')
    def test_check_microphone_none(self, mock_list):
        mock_list.return_value = []
        self.assertFalse(check_microphone())

    @patch('pyttsx3.init')
    def test_check_tts_success(self, mock_init):
        mock_engine = mock_init.return_value
        mock_engine.getProperty.return_value = 180
        self.assertTrue(check_tts())

    @patch('pyttsx3.init')
    def test_check_tts_failure(self, mock_init):
        mock_init.side_effect = Exception("TTS Init Error")
        self.assertFalse(check_tts())

if __name__ == "__main__":
    unittest.main()
