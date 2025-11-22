import pyttsx3
import platform
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

engine = None

def _initialize_engine():
    """Initializes the pyttsx3 engine."""
    global engine
    if engine is None:
        try:
            logging.info("Initializing TTS engine...")
            engine = pyttsx3.init()
            logging.info("TTS engine initialized successfully.")
        except Exception as e:
            logging.error(f"Failed to initialize pyttsx3 engine: {e}")
            raise

def speak(text: str):
    """
    Converts the given text to speech.
    """
    if not text:
        logging.warning("No text provided to speak.")
        return

    try:
        _initialize_engine()
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        logging.error(f"Error in TTS speak function: {e}")

def set_voice(voice_id: str = None):
    """
    Sets the voice of the TTS engine.
    """
    try:
        _initialize_engine()
        voices = engine.getProperty('voices')
        if not voices:
            logging.warning("No TTS voices found on this system.")
            return

        if voice_id:
            engine.setProperty('voice', voice_id)
            return

        os_type = platform.system()
        desired_gender = 'female'
        for voice in voices:
            if hasattr(voice, 'gender') and voice.gender == desired_gender:
                engine.setProperty('voice', voice.id)
                return

        if os_type == "Windows":
            for voice in voices:
                if "zira" in voice.name.lower() or "female" in voice.name.lower():
                    engine.setProperty('voice', voice.id)
                    return

        engine.setProperty('voice', voices[0].id)
    except Exception as e:
        logging.error(f"Error setting TTS voice: {e}")

def set_rate(rate: int = 180):
    """
    Sets the speaking rate for the TTS engine.
    """
    try:
        _initialize_engine()
        engine.setProperty('rate', rate)
    except Exception as e:
        logging.error(f"Error setting TTS rate: {e}")

if __name__ == '__main__':
    speak("BuddyBot text to speech is working.")
