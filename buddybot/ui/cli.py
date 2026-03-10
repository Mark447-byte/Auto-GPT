import sys
import threading
import time
from buddybot.core.stt import BuddySTT
from buddybot.core.tts import BuddyTTS
from buddybot.core.llm import BuddyLLM
from buddybot.agent.loop import AgentLoop
from buddybot.memory.long_term import LongTermMemory
from buddybot.memory.short_term import ShortTermMemory
from buddybot.tools.task_tools import TaskTools

class BuddyCLI:
    def __init__(self):
        self.llm = BuddyLLM()
        self.stt = BuddySTT()
        self.tts = BuddyTTS()
        self.long_term_mem = LongTermMemory()
        self.short_term_mem = ShortTermMemory()
        self.task_tools = TaskTools(self.long_term_mem)
        self.agent = AgentLoop(self.llm, self.task_tools, self.long_term_mem, self.short_term_mem)

        self.voice_triggered = False
        self.stop_listening = None

    def on_wake_word(self):
        print("\n[Wake Word Detected!]")
        self.voice_triggered = True

    def start(self):
        print("\n--- BuddyBot Agentic CLI Mode ---")
        print("Commands:")
        print(" - Type your message for text input.")
        print(" - Say 'Hey Buddy' at any time to activate voice input.")
        print(" - Type 'exit' to quit.")

        # Start non-blocking background listener
        self.stop_listening = self.stt.listen_continuously(self.on_wake_word)

        try:
            while True:
                # Check if voice was triggered in background
                if self.voice_triggered:
                    self.voice_triggered = False
                    self.tts.speak("Yes, I'm listening.")
                    command = self.stt.capture_command()
                    if command:
                        print(f"You (voice): {command}")
                        self.process_goal(command)
                    else:
                        print("No voice command detected.")
                    continue

                # Non-blocking check for text input
                # Since input() is blocking, we'll use it but the background thread still works.
                # If the user is typing when the wake word is detected, it will handle it after the enter.
                # To be truly non-blocking on input, we'd need more complex sys.stdin handling.
                print("\nYou: ", end="", flush=True)

                # We use a small timeout trick or just accept that input() blocks the main thread
                # but NOT the background thread.
                user_input = input().strip()

                if not user_input:
                    continue
                if user_input.lower() in ['exit', 'quit']:
                    break

                self.process_goal(user_input)

        except KeyboardInterrupt:
            pass
        finally:
            if self.stop_listening:
                self.stop_listening(wait_for_stop=False)
            print("\nBuddyBot: Goodbye!")

    def process_goal(self, goal):
        print("BuddyBot is planning and executing...")
        response_details = self.agent.run(goal)

        # Speak a summary
        summary_prompt = f"Summarize the following execution results for the user in one or two friendly sentences:\n{response_details}"
        friendly_summary = self.llm.generate(summary_prompt)
        print(f"BuddyBot: {friendly_summary}")
        self.tts.speak(friendly_summary)

def start_cli():
    cli = BuddyCLI()
    cli.start()

if __name__ == "__main__":
    start_cli()
