import sys
import logging
from buddybot.input.input_controller import InputController
from buddybot.core.stt import SpeechToText
from buddybot.core.llm import OllamaCLI
from buddybot.core.tts import TextToSpeech
from buddybot.utils.system_check import run_system_checks

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

def main():
    """
    Main entry point for BuddyBot Phase 1 (PRD 6).
    """
    print("========================================")
    print("   BuddyBot Phase 1: Local Assistant    ")
    print("========================================")

    # Perform system health checks on startup
    run_system_checks()

    # Initialize components
    stt_service = SpeechToText(max_seconds=10)
    input_ctrl = InputController(voice_input_service=stt_service)
    llm = OllamaCLI(model="tinyllama", timeout=40)
    tts = TextToSpeech(rate=180)

    while True:
        try:
            choice = input_ctrl.get_user_choice()

            if choice == 'Q':
                print("BuddyBot: Goodbye!")
                break

            user_input = ""
            if choice == 'T':
                user_input = input_ctrl.get_text_input()
            elif choice == 'V':
                user_input = input_ctrl.get_voice_input()
            else:
                print("Invalid choice. Please press T, V, or Q.")
                continue

            if not user_input:
                print("No input detected. Returning to selection.")
                continue

            # Process intent via LLM CLI (PRD 5.3)
            print("\nThinking...")
            response = llm.generate(user_input)

            # Display response
            print(f"\nBuddyBot: {response}")

            # Speak response (PRD 5.4)
            tts.speak(response)

        except KeyboardInterrupt:
            print("\nBuddyBot: Goodbye!")
            break
        except Exception as e:
            logging.error(f"BuddyBot encountered a system error: {str(e)}")
            print("An unexpected error occurred. Please try again.")

if __name__ == "__main__":
    main()
