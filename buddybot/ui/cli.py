import os
import argparse
from datetime import datetime
from buddybot.core.agent import run_agent
from buddybot.core.tts import speak

LOG_DIR = os.path.join(os.path.dirname(__file__), '..', 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

def log_conversation(user_input, agent_response):
    """Logs the conversation to a timestamped file."""
    timestamp = datetime.now().strftime("%Y-%m-%d")
    log_file = os.path.join(LOG_DIR, f"cli_conversation_{timestamp}.log")

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"User: {user_input}\n")
        f.write(f"BuddyBot: {agent_response}\n")
        f.write("-" * 20 + "\n")

def start_cli():
    """
    Starts the command-line interface for BuddyBot.
    """
    print("BuddyBot CLI Initialized. Type 'exit' to quit.")

    while True:
        try:
            user_input = input("You: ")

            if user_input.lower() == 'exit':
                print("Goodbye!")
                break

            # Placeholder for voice input
            if user_input.lower() == 'voice':
                print("Voice input is not yet implemented in the CLI. Please use text.")
                continue

            if not user_input:
                continue

            agent_response = run_agent(user_input)

            print(f"BuddyBot: {agent_response}")
            speak(agent_response) # Speak the response

            log_conversation(user_input, agent_response)

        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="BuddyBot Command-Line Interface")
    parser.add_argument("--cli", action="store_true", help="Run in command-line mode")
    args = parser.parse_args()

    if args.cli:
        start_cli()
    else:
        print("To run the CLI, use the --cli flag.")
