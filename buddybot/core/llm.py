from llama_cpp import Llama
import os

# --- Constants ---
MODEL_NAME = "Phi-3-mini-4k-instruct-q4.gguf"
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'llm', MODEL_NAME)
CONTEXT_LENGTH = 4096
DEFAULT_SYSTEM_PROMPT = """
You are BuddyBot, a helpful and friendly AI assistant for Windows.
Your goal is to assist users with their computer-related tasks, answer their questions, and automate workflows.
You must be concise, accurate, and always prioritize user safety.
"""

# --- Globals ---
llm_model = None

# --- Functions ---

def _initialize_model():
    """
    Initializes the Llama C++ model if it's not already loaded.
    """
    global llm_model
    if llm_model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"LLM model not found at path: {MODEL_PATH}")
        try:
            llm_model = Llama(
                model_path=MODEL_PATH,
                n_ctx=CONTEXT_LENGTH,
                n_threads=os.cpu_count() or 4,  # Use all available cores or default to 4
                n_gpu_layers=0  # Set to 0 for CPU-only inference
            )
        except Exception as e:
            print(f"Failed to load LLM model: {e}")
            raise

def generate(prompt: str, max_tokens: int = 256) -> str:
    """
    Generates a text completion for a given prompt.

    Args:
        prompt (str): The input text to generate from.
        max_tokens (int): The maximum number of tokens to generate.

    Returns:
        str: The generated text, or an empty string if generation fails.
    """
    if not prompt:
        print("LLM Warning: No prompt provided for generation.")
        return ""

    try:
        _initialize_model()
        output = llm_model(
            prompt,
            max_tokens=max_tokens,
            stop=["<|end|>"],
            echo=False  # Do not echo the prompt in the output
        )
        return output['choices'][0]['text'].strip()
    except Exception as e:
        print(f"Error during LLM text generation: {e}")
        return ""

def chat(history: list, max_tokens: int = 512) -> str:
    """
    Manages a conversational chat with the LLM.

    Args:
        history (list): A list of dictionaries representing the conversation history.
                        Example: [{'role': 'user', 'content': 'Hello!'}]
        max_tokens (int): The maximum number of tokens to generate for the response.

    Returns:
        str: The assistant's response.
    """
    if not history:
        print("LLM Warning: No chat history provided.")
        return ""

    try:
        _initialize_model()
        # The chat_completion function is ideal for conversational context
        response = llm_model.create_chat_completion(
            messages=history,
            max_tokens=max_tokens
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"Error during LLM chat completion: {e}")
        return ""

def system_prompt() -> str:
    """

    Returns the default system prompt.
    """
    return DEFAULT_SYSTEM_PROMPT

def test_llm():
    """
    A simple function to test the LLM module.
    """
    print("Testing Local LLM functionality...")
    prompt = "Hello BuddyBot, can you tell me a fun fact about computers?"

    # Prepend the system prompt and format for chat
    history = [
        {"role": "system", "content": system_prompt()},
        {"role": "user", "content": prompt}
    ]

    response = chat(history)

    if response:
        print(f"LLM Response: {response}")
    else:
        print("LLM test failed to generate a response.")
    print("LLM test complete.")

if __name__ == '__main__':
    test_llm()
