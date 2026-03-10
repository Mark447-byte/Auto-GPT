import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import logging
import requests
import json

logger = logging.getLogger(__name__)

class OllamaProvider:
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
            response = requests.post(self.api_url, json=payload, timeout=40)
            response.raise_for_status()
            return response.json().get("response", "")
        except Exception as e:
            logger.error(f"Ollama error: {e}")
            return f"Error connecting to Ollama: {str(e)}"

class TransformersProvider:
    def __init__(self, model_name="TinyLlama/TinyLlama-1.1B-Chat-v1.0"):
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

    def load_model(self):
        if self.model is None:
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
                device_map="auto" if self.device == "cuda" else None
            )
            if self.device == "cpu":
                self.model.to(self.device)

    def generate(self, prompt, system_prompt=None):
        self.load_model()
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        elif "You are BuddyBot" not in prompt:
            messages.append({"role": "system", "content": "You are BuddyBot, a helpful AI assistant."})

        messages.append({"role": "user", "content": prompt})

        input_text = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        inputs = self.tokenizer(input_text, return_tensors="pt").to(self.device)

        outputs = self.model.generate(
            **inputs,
            max_new_tokens=256,
            do_sample=True,
            temperature=0.7,
            pad_token_id=self.tokenizer.eos_token_id
        )

        decoded = self.tokenizer.decode(outputs[0], skip_special_tokens=False)
        if "<|assistant|>" in decoded:
            response = decoded.split("<|assistant|>")[-1].strip()
        else:
            response = decoded.split("assistant")[-1].strip()

        if "</s>" in response: response = response.split("</s>")[0].strip()
        return response

class BuddyLLM:
    def __init__(self, config=None):
        config = config or {}
        llm_config = config.get('llm', {})
        self.provider_type = llm_config.get('provider', 'ollama')

        if self.provider_type == 'ollama':
            self.provider = OllamaProvider(
                model=llm_config.get('model', 'phi3:mini'),
                api_url=llm_config.get('api_url', 'http://localhost:11434/api/generate')
            )
        else:
            self.provider = TransformersProvider(
                model_name=llm_config.get('model', 'TinyLlama/TinyLlama-1.1B-Chat-v1.0')
            )

    def generate(self, prompt, system_prompt=None):
        return self.provider.generate(prompt, system_prompt)
