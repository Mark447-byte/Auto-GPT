import yaml
import os
import sys

from buddybot.llm.ollama_client import OllamaClient
from buddybot.memory.long_term import LongTermMemory
from buddybot.memory.short_term import ShortTermMemory
from buddybot.tools.task_tools import TaskTools
from buddybot.agent.loop import AgentLoop
from buddybot.speech.audio_recorder import AudioRecorder
from buddybot.speech.speech_to_text import SpeechToText
from buddybot.input.voice_input import VoiceInput
from buddybot.input.input_controller import InputController
from buddybot.utils.system_check import run_all_checks

def load_config():
    # Calculate path relative to this file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(base_dir, "config", "settings.yaml")

    if os.path.exists(config_path):
        try:
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error reading config: {str(e)}")
    return {}

def main():
    print("=== BuddyBot: Local Agentic Assistant ===")
    config = load_config()

    # System checks
    run_all_checks(config)

    # Initialize components
    llm_client = OllamaClient(
        model=config.get('llm', {}).get('model', 'phi3:mini'),
        api_url=config.get('llm', {}).get('api_url', 'http://localhost:11434/api/generate')
    )

    long_term_mem = LongTermMemory()
    short_term_mem = ShortTermMemory()
    task_tools = TaskTools(long_term_mem)

    # Pass short_term_mem to AgentLoop
    agent = AgentLoop(llm_client, task_tools, long_term_mem, short_term_mem)

    recorder = AudioRecorder(max_seconds=config.get('voice', {}).get('max_record_seconds', 10))
    stt = SpeechToText(
        mode=config.get('voice', {}).get('transcription_mode', 'online'),
        language=config.get('voice', {}).get('language', 'en-US')
    )
    voice_in = VoiceInput(recorder, stt)
    input_ctrl = InputController(voice_in)

    print("\nBuddyBot is ready. Type 'exit' to quit.")

    while True:
        try:
            user_goal = input_ctrl.get_user_goal()

            if user_goal.lower() in ['exit', 'quit']:
                print("BuddyBot: Goodbye!")
                break

            if not user_goal.strip():
                continue

            response = agent.run(user_goal)
            print(f"\nBuddyBot Execution Summary:\n{response}")

        except KeyboardInterrupt:
            print("\nBuddyBot: Goodbye!")
            break
        except Exception as e:
            print(f"BuddyBot encountered a system error: {str(e)}")

if __name__ == "__main__":
    main()
