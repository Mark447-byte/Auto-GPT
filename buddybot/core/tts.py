import pyttsx3
import logging

logger = logging.getLogger(__name__)

class BuddyTTS:
    def __init__(self, rate=180):
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('rate', rate)
        except Exception as e:
            logger.error(f"TTS Initialization error: {e}")
            self.engine = None

    def speak(self, text):
        if not text or not self.engine:
            return
        try:
            self.engine.say(text)
            self.engine.runAndWait()
        except Exception as e:
            logger.error(f"TTS speak error: {e}")
