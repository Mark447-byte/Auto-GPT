import pyttsx3
import platform

engine = None

def _initialize_engine():
    """Initializes the pyttsx3 engine if it's not already running."""
    global engine
    if engine is None:
        try:
            engine = pyttsx3.init()
        except Exception as e:
            print(f"Failed to initialize pyttsx3 engine: {e}")
            raise

def speak(text: str):
    """
    Converts the given text to speech using the initialized engine.
    """
    if not text:
        print("TTS Warning: No text provided to speak.")
        return

    try:
        _initialize_engine()
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        print(f"Error in TTS speak function: {e}")

def set_voice(voice_id: str = None):
    """
    Sets the voice of the TTS engine.
    - If a voice_id is provided, it uses that.
    - Otherwise, it tries to select a default female voice based on the OS.
    """
    try:
        _initialize_engine()
        voices = engine.getProperty('voices')

        if not voices:
            print("No TTS voices found on this system.")
            return

        if voice_id:
            engine.setProperty('voice', voice_id)
            return

        # Default voice selection logic
        os_type = platform.system()
        desired_gender = 'female'

        for voice in voices:
            # Simple check for gender attribute, which may not always exist
            if hasattr(voice, 'gender') and voice.gender == desired_gender:
                engine.setProperty('voice', voice.id)
                return

        # Fallback for Windows if gender is not available
        if os_type == "Windows":
            for voice in voices:
                if "zira" in voice.name.lower() or "female" in voice.name.lower():
                    engine.setProperty('voice', voice.id)
                    return

        # Fallback to the first voice if no suitable default is found
        engine.setProperty('voice', voices[0].id)
    except Exception as e:
        print(f"Error setting TTS voice: {e}")

def set_rate(rate: int = 180):
    """
    Sets the speaking rate for the TTS engine.
    Default rate is 180 words per minute.
    """
    try:
        _initialize_engine()
        engine.setProperty('rate', rate)
    except Exception as e:
        print(f"Error setting TTS rate: {e}")

def test_speech():
    """
    A simple function to test if the TTS module is working correctly.
    """
    print("Testing Text-to-Speech functionality...")
    speak("BuddyBot text to speech is working.")
    print("TTS test complete.")

if __name__ == '__main__':
    # This block allows for direct testing of the module.
    test_speech()
