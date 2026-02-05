import requests
import json

class OllamaClient:
    def __init__(self, model="phi3:mini", api_url="http://localhost:11434/api/generate"):
        self.model = model
        self.api_url = api_url

    def generate(self, prompt, system_prompt=None):
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False
        }
        if system_prompt:
            payload["system"] = system_prompt

        try:
            response = requests.post(self.api_url, json=payload, timeout=30)
            response.raise_for_status()
            return response.json().get("response", "")
        except Exception as e:
            return f"Error connecting to Ollama: {str(e)}"

    def chat(self, messages):
        # Alternative chat API if needed
        chat_url = self.api_url.replace("/generate", "/chat")
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": False
        }
        try:
            response = requests.post(chat_url, json=payload, timeout=30)
            response.raise_for_status()
            return response.json().get("message", {}).get("content", "")
        except Exception as e:
            return f"Error connecting to Ollama: {str(e)}"
