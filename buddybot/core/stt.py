import speech_recognition as sr
import logging
import queue

logger = logging.getLogger(__name__)

class BuddySTT:
    def __init__(self, wake_word="hey buddy"):
        self.recognizer = sr.Recognizer()
        self.wake_word = wake_word.lower()
        self.microphone = sr.Microphone()
        self.audio_queue = queue.Queue()

    def listen_continuously(self, callback):
        """
        Non-blocking background listener for the wake word.
        """
        def background_callback(recognizer, audio):
            try:
                text = recognizer.recognize_google(audio).lower()
                if self.wake_word in text:
                    callback()
            except sr.UnknownValueError:
                pass
            except Exception as e:
                logger.error(f"Background listener error: {e}")

        return self.recognizer.listen_in_background(self.microphone, background_callback)

    def capture_command(self, timeout=10):
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)
            try:
                audio = self.recognizer.listen(source, timeout=timeout, phrase_time_limit=timeout)
                return self.recognizer.recognize_google(audio)
            except Exception:
                return None
