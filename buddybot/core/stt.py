import speech_recognition as sr
import logging

logger = logging.getLogger(__name__)

class SpeechToText:
    """
    Handles capturing voice from the microphone and transcribing via Google Web Speech API (PRD 5.2).
    """
    def __init__(self, max_seconds=10):
        self.recognizer = sr.Recognizer()
        self.max_seconds = max_seconds

    def capture_and_transcribe(self):
        """
        Activates microphone for a maximum of 10 seconds and transcribes (PRD 5.2).
        """
        with sr.Microphone() as source:
            print(f"Listening (max {self.max_seconds}s)...")
            self.recognizer.adjust_for_ambient_noise(source)
            try:
                # Capture audio for the specified maximum duration
                audio_data = self.recognizer.listen(source, timeout=self.max_seconds, phrase_time_limit=self.max_seconds)
                print("Recording stopped. Transcribing...")

                # Transcription via Google Web Speech API
                # Requires internet access (PRD 4)
                text = self.recognizer.recognize_google(audio_data)
                return text.strip()

            except sr.WaitTimeoutError:
                logger.warning("Listening timed out (no speech detected).")
                return None
            except sr.UnknownValueError:
                logger.error("Google Web Speech API could not understand the audio.")
                return None
            except sr.RequestError as e:
                logger.error(f"Could not request results from Google Web Speech API; {e}")
                return None
            except Exception as e:
                logger.error(f"Unexpected error during STT: {str(e)}")
                return None

if __name__ == "__main__":
    # Test capture and transcribe (requires hardware mic)
    stt = SpeechToText()
    transcription = stt.capture_and_transcribe()
    if transcription:
        print(f"Transcription: {transcription}")
    else:
        print("Transcription failed or was empty.")
