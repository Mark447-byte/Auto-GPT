import speech_recognition as sr
import os

class AudioRecorder:
    def __init__(self, max_seconds=10):
        self.max_seconds = max_seconds
        self.recognizer = sr.Recognizer()

    def record_to_file(self, filename="buddybot/logs/temp_audio.wav"):
        try:
            with sr.Microphone() as source:
                print(f"BuddyBot: Listening (max {self.max_seconds}s)...")
                audio = self.recognizer.listen(source, timeout=self.max_seconds, phrase_time_limit=self.max_seconds)
                with open(filename, "wb") as f:
                    f.write(audio.get_wav_data())
                return filename
        except Exception as e:
            print(f"BuddyBot Error: Could not access microphone. {str(e)}")
            return None
