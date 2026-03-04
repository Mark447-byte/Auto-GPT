import logging

logger = logging.getLogger(__name__)

class InputController:
    """
    Handles user selection between text and voice input (PRD 5.1).
    """
    def __init__(self, voice_input_service=None):
        self.voice_input_service = voice_input_service

    def get_user_choice(self):
        """
        Presents the user with choice T/V/Q (PRD 5.1).
        """
        print("\n--- BuddyBot Input Selection ---")
        print("Press T for Text")
        print("Press V for Voice")
        print("Press Q to Quit")

        choice = input("Your choice: ").strip().upper()
        return choice

    def get_text_input(self):
        """
        Captures input using Python input() (PRD 5.1).
        """
        return input("\nUser (Text): ").strip()

    def get_voice_input(self):
        """
        Activates microphone and transcribes voice (PRD 5.1 & 5.2).
        Falls back to text input on failure.
        """
        if not self.voice_input_service:
            print("Voice input not available. Falling back to text.")
            return self.get_text_input()

        print("\n[Voice Mode] Activate Microphone...")
        try:
            transcription = self.voice_input_service.capture_and_transcribe()
            if transcription:
                print(f"User (Voice): {transcription}")
                return transcription
            else:
                print("Voice transcription failed or was empty. Falling back to text.")
                return self.get_text_input()
        except Exception as e:
            logger.error(f"Error during voice capture: {str(e)}")
            print("Microphone error occurred. Falling back to text.")
            return self.get_text_input()

if __name__ == "__main__":
    # Mock voice service for testing
    class MockVoiceService:
        def capture_and_transcribe(self):
            return "This is a mock transcription."

    ic = InputController(MockVoiceService())
    choice = ic.get_user_choice()
    if choice == 'T':
        print(f"Captured: {ic.get_text_input()}")
    elif choice == 'V':
        print(f"Captured: {ic.get_voice_input()}")
    elif choice == 'Q':
        print("Quitting...")
