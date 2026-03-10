# BuddyBot - Local Agentic Assistant

BuddyBot is a local-first, agentic virtual assistant built in Python. It supports both text and voice input with background wake word activation ("Hey Buddy") and uses a local language model (via Ollama or Transformers) for reasoning and planning.

## Features
- **Agentic Loop:** Plans, executes tools, and reflects on results using a local LLM.
- **Wake Word Activation:** Listen for "Hey Buddy" in the background for hands-free voice commands.
- **Multi-Modal UI:** Supports both a Command-Line Interface (CLI) and a Graphical User Interface (GUI).
- **Local Memory:** SQLite-backed task management and interaction history.
- **Privacy First:** Designed for local execution to keep your data private.

## Requirements
- Python 3.10 or higher
- [Ollama](https://ollama.com/) (recommended) or Transformers-compatible GPU/CPU
- Microphone and Speakers
- PortAudio (System dependency for PyAudio)
- eSpeak-ng (System dependency for pyttsx3)

## Installation

1. **Install System Dependencies (Linux):**
   ```bash
   sudo apt-get install portaudio19-dev espeak-ng
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r buddybot/requirements.txt
   ```

3. **Setup Ollama (Default):**
   - Install Ollama from [ollama.com](https://ollama.com/).
   - Pull the default model:
     ```bash
     ollama pull phi3:mini
     ```

## Usage

1. **Start the assistant:**
   ```bash
   export PYTHONPATH=$PYTHONPATH:.
   python buddybot/main.py --cli  # For CLI mode
   python buddybot/main.py        # For GUI mode
   ```

2. **Interaction:**
   - **Text:** Type your message and press Enter.
   - **Voice:** Say "Hey Buddy" followed by your command.
   - Type `exit` to quit.

## Project Structure
- `buddybot/main.py`: Entry point and mode selection.
- `buddybot/agent/`: Agentic loop (Planner and Reflector).
- `buddybot/core/`: Consolidated core modules (LLM, STT, TTS).
- `buddybot/tools/`: Agent tools (file, task, shell).
- `buddybot/memory/`: Memory layers (Long-term SQLite and short-term).
- `buddybot/ui/`: CLI and GUI implementations.

## Configuration
Settings can be adjusted in `buddybot/config/settings.yaml`. You can switch between `ollama` and `transformers` providers and change models there.
