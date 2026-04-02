import subprocess
import logging
import speech_recognition as sr
import pyttsx3
import sys
import platform

logger = logging.getLogger(__name__)

def check_ollama():
    """Checks if the Ollama CLI is installed and in the PATH."""
    try:
        result = subprocess.run(["ollama", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            return True, f"Found: {result.stdout.strip()}"
        else:
            return False, "Ollama CLI check failed. Ensure the service is running."
    except FileNotFoundError:
        return False, "Ollama CLI not found. Install from https://ollama.com and add to PATH."

def check_model(model_name="tinyllama"):
    """Checks if the specified model is available in Ollama."""
    try:
        result = subprocess.run(["ollama", "list"], capture_output=True, text=True)
        if result.returncode == 0:
            if model_name in result.stdout:
                return True, f"Model '{model_name}' is ready."
            else:
                return False, f"Model '{model_name}' not found. Run: 'ollama pull {model_name}'"
        else:
            return False, "Failed to communicate with Ollama service."
    except FileNotFoundError:
        return False, "Ollama CLI not found."

def check_microphone():
    """Checks for available microphones."""
    try:
        mics = sr.Microphone.list_microphone_names()
        if mics:
            return True, f"{len(mics)} device(s) detected."
        else:
            return False, "No microphones detected. Voice input (V) will fail. Check Privacy Settings."
    except Exception as e:
        if "PyAudio" in str(e):
            fix = "Install PyAudio. Windows: 'pip install PyAudio'. Linux: 'sudo apt install python3-pyaudio'."
            return False, f"PyAudio missing. {fix}"
        return False, f"Microphone error: {str(e)}"

def check_tts():
    """Checks if the TTS engine can be initialized."""
    try:
        engine = pyttsx3.init()
        engine.getProperty('rate')
        return True, "Initialized successfully."
    except Exception as e:
        system = platform.system()
        msg = f"TTS Error: {str(e)}."
        if system == "Linux":
            msg += " Install eSpeak: 'sudo apt install espeak-ng'."
        elif system == "Windows":
            msg += " Ensure Windows Speech API (SAPI5) is enabled."
        return False, msg

def run_system_checks():
    """Executes all system health checks and returns a summary."""
    print("\n" + "="*40)
    print("   BuddyBot System Health Check")
    print("="*40)

    checks = [
        ("Ollama CLI", check_ollama),
        ("TinyLlama Model", check_model),
        ("Microphone", check_microphone),
        ("TTS Engine", check_tts)
    ]

    all_ok = True
    for name, func in checks:
        success, message = func()
        status = "[OK]" if success else "[FAIL]"
        print(f"{name:20} : {status}")
        if not success:
            print(f"  -> Fix: {message}")
            all_ok = False
        else:
            print(f"  -> {message}")

    print("="*40)
    if all_ok:
        print("BuddyBot is ready to run!")
    else:
        print("Action required before BuddyBot can function fully.")
    print("="*40 + "\n")

    return all_ok

if __name__ == "__main__":
    logging.basicConfig(level=logging.ERROR)
    run_system_checks()
