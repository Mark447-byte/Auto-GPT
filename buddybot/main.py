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

def load_config():
    config_path = "buddybot/config/settings.yaml"
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
    return {}

def main():
    print("=== BuddyBot: Local Agentic Assistant ===")
    config = load_config()

    # Initialize components
    llm_client = OllamaClient(
        model=config.get('llm', {}).get('model', 'phi3:mini'),
        api_url=config.get('llm', {}).get('api_url', 'http://localhost:11434/api/generate')
    )

    long_term_mem = LongTermMemory()
    short_term_mem = ShortTermMemory()
    task_tools = TaskTools(long_term_mem)

    agent = AgentLoop(llm_client, task_tools, long_term_mem)

    recorder = AudioRecorder(max_seconds=config.get('voice', {}).get('max_record_seconds', 10))
    stt = SpeechToText(
        mode=config.get('voice', {}).get('transcription_mode', 'online'),
        language=config.get('voice', {}).get('language', 'en-US')
    )
    voice_in = VoiceInput(recorder, stt)
    input_ctrl = InputController(voice_in)

    print("BuddyBot is ready. Type 'exit' to quit.")

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
            print(f"BuddyBot encountered an error: {str(e)}")

if __name__ == "__main__":
    main()
