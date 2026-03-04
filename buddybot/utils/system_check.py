import subprocess
import logging
import speech_recognition as sr
import pyttsx3
import sys

logger = logging.getLogger(__name__)

def check_ollama():
    """Checks if the Ollama CLI is installed and in the PATH."""
    try:
        result = subprocess.run(["ollama", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            logger.info(f"Ollama CLI found: {result.stdout.strip()}")
            return True
        else:
            logger.error(f"Ollama CLI check failed with return code {result.returncode}.")
            return False
    except FileNotFoundError:
        logger.error("Ollama CLI not found. Please install Ollama (https://ollama.com).")
        return False

def check_model(model_name="tinyllama"):
    """Checks if the specified model is available in Ollama."""
    try:
        # PRD 5.3: Must call Ollama via CLI (ollama run)
        # We can also use 'ollama list' to check for models
        result = subprocess.run(["ollama", "list"], capture_output=True, text=True)
        if result.returncode == 0:
            if model_name in result.stdout:
                logger.info(f"Model '{model_name}' is available in Ollama.")
                return True
            else:
                logger.error(f"Model '{model_name}' not found. Run 'ollama pull {model_name}' to download it.")
                return False
        else:
            logger.error(f"Failed to list Ollama models. Code: {result.returncode}.")
            return False
    except FileNotFoundError:
        logger.error("Ollama CLI not found while checking models.")
        return False

def check_microphone():
    """Checks for available microphones."""
    try:
        mics = sr.Microphone.list_microphone_names()
        if mics:
            logger.info(f"Microphone(s) detected: {len(mics)} device(s) found.")
            return True
        else:
            logger.error("No microphones detected. Voice input (V) will not work.")
            return False
    except Exception as e:
        logger.error(f"Microphone access error: {str(e)}")
        return False

def check_tts():
    """Checks if the TTS engine can be initialized."""
    try:
        engine = pyttsx3.init()
        # Test basic property retrieval
        rate = engine.getProperty('rate')
        logger.info(f"TTS engine initialized successfully (default rate: {rate}).")
        return True
    except Exception as e:
        logger.error(f"TTS initialization failed: {str(e)}")
        return False

def run_system_checks():
    """Executes all system health checks and returns a summary."""
    print("\n--- Running System Health Checks ---")

    status = {
        "Ollama CLI": check_ollama(),
        "TinyLlama Model": check_model(),
        "Microphone Access": check_microphone(),
        "TTS Engine": check_tts()
    }

    all_ok = True
    print("\nCheck Results:")
    for check, result in status.items():
        res_str = "[OK]" if result else "[FAIL]"
        print(f"{check:20} : {res_str}")
        if not result:
            all_ok = False

    if all_ok:
        print("\nAll system checks passed! BuddyBot is ready for local deployment.")
    else:
        print("\nWarning: Some system checks failed. BuddyBot may not function correctly.")
        print("Please resolve the issues listed above for the best experience.")

    return all_ok

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
    run_system_checks()
