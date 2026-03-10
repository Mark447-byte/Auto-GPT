import argparse
import sys
import logging
from buddybot.ui.cli import start_cli

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

def main():
    parser = argparse.ArgumentParser(description="BuddyBot - Your AI Personal Assistant")
    parser.add_argument("--cli", action="store_true", help="Run BuddyBot in command-line interface mode.")
    parser.add_argument("--gui", action="store_true", help="Run BuddyBot in graphical user interface mode (default).")
    args = parser.parse_args()

    print("========================================")
    print("   BuddyBot: Your AI Personal Assistant ")
    print("========================================")

    try:
        if args.cli:
            start_cli()
        else:
            # Default to GUI mode
            try:
                from buddybot.ui.gui import start_gui
                start_gui()
            except ImportError:
                print("GUI module not found. Falling back to CLI mode.")
                start_cli()

    except KeyboardInterrupt:
        print("\nBuddyBot: Goodbye!")
    except Exception as e:
        print(f"A critical error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
