import pyttsx3
import logging

logger = logging.getLogger(__name__)

class TextToSpeech:
    """
    Provides offline text-to-speech output using pyttsx3 (PRD 5.4).
    """
    def __init__(self, rate=180):
        self.rate = rate
        self.engine = None
        self._initialize_engine()

    def _initialize_engine(self):
        """Initializes the pyttsx3 engine."""
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('rate', self.rate)
            logger.info(f"TTS engine initialized with rate {self.rate}.")
        except Exception as e:
            logger.error(f"Failed to initialize pyttsx3 engine: {e}")
            self.engine = None

    def speak(self, text):
        """
        Converts the given text to speech (PRD 5.4).
        """
        if not text:
            return

        if self.engine is None:
            logger.warning("TTS engine is not available. Speech output skipped.")
            return

        try:
            logger.info(f"Speaking: {text}")
            self.engine.say(text)
            self.engine.runAndWait()
        except Exception as e:
            logger.error(f"Error during TTS speak: {e}")

if __name__ == '__main__':
    # Test speak functionality (requires audio hardware)
    tts = TextToSpeech()
    tts.speak("Hello from BuddyBot. Offline speech is working.")
