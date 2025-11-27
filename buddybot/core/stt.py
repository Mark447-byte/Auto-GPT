from whispercpp import Whisper
import os
import speech_recognition as sr
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Constants ---
MODEL_NAME = "ggml-base.en.bin"

# --- Globals ---
stt_model = None

# --- Functions ---

def _initialize_model():
    """
    Initializes the Whisper.cpp model from the cache.
    """
    global stt_model
    if stt_model is None:
        try:
            logging.info(f"Loading Whisper.cpp model: {MODEL_NAME}")
            stt_model = Whisper.from_pretrained(MODEL_NAME)
            logging.info("Whisper.cpp model loaded successfully.")
        except Exception as e:
            logging.error(f"Failed to load Whisper.cpp model from cache: {e}")
            raise

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes the audio from a given file path.
    """
    if not os.path.exists(audio_path):
        logging.error(f"Audio file not found at {audio_path}")
        return ""

    try:
        _initialize_model()
        logging.info(f"Transcribing audio file: {audio_path}")
        result = stt_model.transcribe(audio_path, lang='en')
        full_text = " ".join([segment['text'] for segment in result])
        logging.info(f"Transcription successful for {audio_path}")
        return full_text.strip()
    except Exception as e:
        logging.error(f"Error during audio transcription: {e}")
        return ""

def listen_for_command(audio_path: str = None) -> str:
    """
    Listens for a command from the microphone or a file.
    """
    if audio_path:
        return transcribe_audio(audio_path)

    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            logging.info("Adjusting for ambient noise...")
            r.adjust_for_ambient_noise(source)
            logging.info("Listening for command...")
            audio = r.listen(source, timeout=5, phrase_time_limit=10)

            temp_audio_file = "temp_command.wav"
            with open(temp_audio_file, "wb") as f:
                f.write(audio.get_wav_data())

            text = transcribe_audio(temp_audio_file)
            logging.info(f"Transcribed command: {text}")

            os.remove(temp_audio_file)
            return text
    except sr.WaitTimeoutError:
        logging.warning("Listening timed out.")
        return ""
    except sr.UnknownValueError:
        logging.warning("Could not understand the audio.")
        return ""
    except Exception as e:
        logging.error(f"An error occurred during live listening: {e}")
        return ""

if __name__ == '__main__':
    # For direct testing, you would need to provide an audio file.
    # Example: print(listen_for_command(audio_path='path/to/your/audio.wav'))
    pass
