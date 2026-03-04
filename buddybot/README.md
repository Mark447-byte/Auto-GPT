# BuddyBot Phase 1: Local Conversational Assistant

BuddyBot is a lightweight, local-first conversational assistant optimized for Windows 11 systems with limited hardware (4GB RAM). It supports both text and push-to-talk voice input and provides offline responses via a local LLM and TTS.

## Prerequisites

1. **Python 3.10+**: Ensure Python is installed and added to your system's PATH.
2. **Ollama**:
   - Download and install Ollama from [ollama.com](https://ollama.com).
   - Once installed, open a terminal and pull the required model:
     ```bash
     ollama pull tinyllama
     ```
3. **Microsoft Visual C++ Build Tools** (Windows only):
   - Required for building some Python dependencies like `PyAudio`.
   - Download from [visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
4. **PortAudio** (Linux only):
   - Required for `PyAudio`. Install via your package manager (e.g., `sudo apt install portaudio19-dev`).

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Python dependencies**:
   It is recommended to use a virtual environment.
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r buddybot/requirements.txt
   ```

3. **Verify Installation**:
   BuddyBot includes a system check utility to verify your environment.
   ```bash
   export PYTHONPATH=$PYTHONPATH:.  # On Windows: set PYTHONPATH=%PYTHONPATH%;.
   python buddybot/utils/system_check.py
   ```

## Usage

Run the main application:
```bash
python buddybot/main.py
```

### Controls:
- **T**: Enter text input via the terminal.
- **V**: Activate voice recording (max 10 seconds).
- **Q**: Quit BuddyBot.

## Troubleshooting

- **Ollama CLI not found**: Ensure Ollama is installed and that the terminal can access the `ollama` command.
- **Microphone issues**: Check your system's privacy settings to ensure applications have permission to access the microphone.
- **TTS Errors**: If you hear no sound, verify that your default audio output device is correctly set.
