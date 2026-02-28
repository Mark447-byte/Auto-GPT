import requests
import speech_recognition as sr
import os

def check_ollama(api_url, model_name):
    """Checks if Ollama is running and has the required model."""
    try:
        # Check connectivity
        tags_url = api_url.replace("/generate", "/tags")
        response = requests.get(tags_url, timeout=5)
        if response.status_code != 200:
            return False, f"Ollama returned status code {response.status_code}"

        models = response.json().get("models", [])
        model_exists = any(m.get("name") == model_name or m.get("name").startswith(model_name) for m in models)

        if not model_exists:
            return False, f"Model '{model_name}' not found in Ollama. Please run 'ollama pull {model_name}'"

        return True, "Ollama is running and model is available."
    except requests.exceptions.ConnectionError:
        return False, "Could not connect to Ollama. Is it running?"
    except Exception as e:
        return False, f"Error checking Ollama: {str(e)}"

def check_microphone():
    """Checks if a microphone is accessible."""
    try:
        # Check if PyAudio is installed and if any microphones exist
        with sr.Microphone() as source:
            return True, "Microphone is accessible."
    except Exception as e:
        return False, f"Microphone access failed: {str(e)}"

def run_all_checks(config):
    llm_conf = config.get('llm', {})
    api_url = llm_conf.get('api_url', 'http://localhost:11434/api/generate')
    model_name = llm_conf.get('model', 'phi3:mini')

    print("\nBuddyBot System Health Check:")

    ollama_ok, ollama_msg = check_ollama(api_url, model_name)
    print(f"[{'OK' if ollama_ok else 'FAIL'}] Ollama: {ollama_msg}")

    mic_ok, mic_msg = check_microphone()
    print(f"[{'OK' if mic_ok else 'WARN'}] Microphone: {mic_msg}")

    if not ollama_ok:
        print("\nWARNING: BuddyBot core (LLM) is not ready. Functions may fail.")

    return ollama_ok and mic_ok
