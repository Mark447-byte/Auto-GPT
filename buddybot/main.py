import argparse
import sys
from buddybot.ui.cli import start_cli
from buddybot.ui.desktop import start_gui
from buddybot.core.memory import load_memory

def main():
    """
    The main entry point for the BuddyBot application.
    """
    # Load memory and initialize any other core components here
    try:
        load_memory()
        print("BuddyBot initialized and ready.")
    except Exception as e:
        print(f"Failed to initialize BuddyBot: {e}")
        sys.exit(1)

    parser = argparse.ArgumentParser(description="BuddyBot - Your AI Personal Assistant")
    parser.add_argument("--cli", action="store_true", help="Run BuddyBot in command-line interface mode.")
    args = parser.parse_args()

    try:
        if args.cli:
            start_cli()
        else:
            # Default to GUI mode if --cli is not specified
            start_gui()
    except Exception as e:
        # Global exception handler
        print(f"A critical error occurred: {e}")
        # Optionally, log this error to a file
        sys.exit(1)

if __name__ == "__main__":
    main()
