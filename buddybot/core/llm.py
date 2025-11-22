from llama_cpp import Llama
import os
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Constants ---
MODEL_NAME = "Phi-3-mini-4k-instruct-q4.gguf"
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'llm', MODEL_NAME)
CONTEXT_LENGTH = 4096
DEFAULT_SYSTEM_PROMPT = """
You are BuddyBot...
"""

# --- Globals ---
llm_model = None

# --- Functions ---

def _initialize_model():
    """
    Initializes the Llama C++ model.
    """
    global llm_model
    if llm_model is None:
        if not os.path.exists(MODEL_PATH):
            logging.error(f"LLM model not found at path: {MODEL_PATH}")
            raise FileNotFoundError(f"LLM model not found at path: {MODEL_PATH}")
        try:
            logging.info("Loading LLM model...")
            llm_model = Llama(
                model_path=MODEL_PATH,
                n_ctx=CONTEXT_LENGTH,
                n_threads=os.cpu_count() or 4,
                n_gpu_layers=0
            )
            logging.info("LLM model loaded successfully.")
        except Exception as e:
            logging.error(f"Failed to load LLM model: {e}")
            raise

def generate(prompt: str, max_tokens: int = 256) -> str:
    """
    Generates a text completion for a given prompt.
    """
    if not prompt:
        logging.warning("No prompt provided for generation.")
        return ""

    try:
        _initialize_model()
        output = llm_model(prompt, max_tokens=max_tokens, stop=["<|end|>"], echo=False)
        return output['choices'][0]['text'].strip()
    except Exception as e:
        logging.error(f"Error during LLM text generation: {e}")
        return ""

def chat(history: list, max_tokens: int = 512) -> str:
    """
    Manages a conversational chat with the LLM.
    """
    if not history:
        logging.warning("No chat history provided.")
        return ""

    try:
        _initialize_model()
        response = llm_model.create_chat_completion(messages=history, max_tokens=max_tokens)
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        logging.error(f"Error during LLM chat completion: {e}")
        return ""

def system_prompt() -> str:
    """Returns the default system prompt."""
    return DEFAULT_SYSTEM_PROMPT

if __name__ == '__main__':
    # Example of how to use the chat function
    history = [
        {"role": "system", "content": system_prompt()},
        {"role": "user", "content": "Hello, how are you?"}
    ]
    print(chat(history))
