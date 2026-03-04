import subprocess
import logging

logger = logging.getLogger(__name__)

class OllamaCLI:
    def __init__(self, model="tinyllama", timeout=40):
        self.model = model
        self.timeout = timeout

    def generate(self, prompt):
        """
        Processes normalized text using the local LLM via CLI.
        PRD 5.3 Requirement: Must call Ollama via CLI (ollama run) and NOT use ollama serve.
        """
        if not prompt:
            return ""

        try:
            # PRD 5.3: Must use subprocess.run()
            result = subprocess.run(
                ["ollama", "run", self.model, prompt],
                capture_output=True,
                text=True,
                timeout=self.timeout
            )

            if result.returncode != 0:
                logger.error(f"Ollama returned non-zero exit code {result.returncode}: {result.stderr}")
                return f"Error: Ollama execution failed with code {result.returncode}."

            return result.stdout.strip()

        except subprocess.TimeoutExpired:
            logger.error(f"Ollama execution timed out after {self.timeout} seconds.")
            return "Error: LLM response timed out."
        except FileNotFoundError:
            logger.error("Ollama CLI not found. Ensure Ollama is installed and in PATH.")
            return "Error: Ollama CLI not found."
        except Exception as e:
            logger.error(f"Unexpected error during Ollama execution: {str(e)}")
            return f"Error: {str(e)}"

if __name__ == "__main__":
    # Quick manual test
    llm = OllamaCLI()
    response = llm.generate("Hello, how are you?")
    print(f"LLM Response: {response}")
