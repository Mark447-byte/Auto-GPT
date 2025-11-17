import whisper
import os
import speech_recognition as sr
import soundfile as sf

# --- Globals ---
stt_model = None

# --- Functions ---

def _initialize_model():
    """
    Initializes the OpenAI Whisper model if it's not already loaded.
    """
    global stt_model
    if stt_model is None:
        try:
            # Load the "base.en" model from OpenAI Whisper
            stt_model = whisper.load_model("base.en")
        except Exception as e:
            print(f"Failed to load Whisper model: {e}")
            raise

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes the audio from a given file path using OpenAI Whisper.

    Args:
        audio_path (str): The path to the audio file.

    Returns:
        str: The transcribed text, or an empty string if transcription fails.
    """
    if not os.path.exists(audio_path):
        print(f"STT Error: Audio file not found at {audio_path}")
        return ""

    try:
        _initialize_model()
        # The transcribe function returns a dictionary with the text
        result = stt_model.transcribe(audio_path)
        return result['text'].strip()
    except Exception as e:
        print(f"Error during audio transcription: {e}")
        return ""

def listen_for_command(audio_path: str = None) -> str:
    """
    Listens for a command from the microphone or a file and transcribes it.
    """
    if audio_path:
        print(f"Transcribing from provided audio file: {audio_path}")
        return transcribe_audio(audio_path)

    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening for a command...")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)
        try:
            audio = r.listen(source, timeout=5, phrase_time_limit=10)

            temp_audio_file = "temp_command.wav"
            with open(temp_audio_file, "wb") as f:
                f.write(audio.get_wav_data())

            text = transcribe_audio(temp_audio_file)
            print(f"User said: {text}")

            os.remove(temp_audio_file)

            return text
        except sr.WaitTimeoutError:
            print("Listening timed out.")
            return ""
        except sr.UnknownValueError:
            print("Could not understand the audio.")
            return ""
        except Exception as e:
            print(f"An error occurred during live listening: {e}")
            return ""

def test_stt():
    """
    A simple function to test the STT module.
    """
    print("Testing Speech-to-Text functionality...")
    text = transcribe_audio("voice.wav") # Assuming voice.wav is in the root
    if text:
        print(f"Transcription result: {text}")
    else:
        print("STT test requires a valid audio file.")
    print("STT test complete.")

if __name__ == '__main__':
    print("STT module loaded. To test, call transcribe_audio('path/to/audio.wav')")
