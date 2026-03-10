import pytest
from buddybot.core.stt import BuddySTT
from buddybot.core.tts import BuddyTTS
from unittest.mock import MagicMock, patch

@patch("speech_recognition.Microphone")
def test_stt_initialization(mock_mic):
    stt = BuddySTT(wake_word="test buddy")
    assert stt.wake_word == "test buddy"

@patch("pyttsx3.init")
def test_tts_initialization(mock_init):
    mock_engine = MagicMock()
    mock_init.return_value = mock_engine
    tts = BuddyTTS()
    mock_init.assert_called_once()
    mock_engine.setProperty.assert_called()

@patch("pyttsx3.init")
def test_tts_speak(mock_init):
    mock_engine = MagicMock()
    mock_init.return_value = mock_engine
    tts = BuddyTTS()
    tts.speak("Hello")
    mock_engine.say.assert_called_with("Hello")
    mock_engine.runAndWait.assert_called_once()
