# BuddyBot Phase 1: Local Conversational Assistant

BuddyBot is a lightweight, local-first conversational assistant optimized for Windows 11 systems with limited hardware (4GB RAM).

## 🚀 Quick Start (Windows 11)

### 1. Install System Dependencies
1. **Ollama**: Download and install from [ollama.com](https://ollama.com).
2. **Microsoft Visual C++ Build Tools**: Required for `PyAudio`. Download from [here](https://visualstudio.microsoft.com/visual-cpp-build-tools/). Select "Desktop development with C++" during installation.

### 2. Setup Ollama Model
Open your terminal (PowerShell or CMD) and run:
```powershell
ollama pull tinyllama
```

### 3. Install BuddyBot
```powershell
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Create a virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install requirements
pip install -r buddybot/requirements.txt
```

### 4. Run Health Check
Verify your environment is ready:
```powershell
$env:PYTHONPATH += ";."
python buddybot/utils/system_check.py
```

### 5. Launch BuddyBot
```powershell
python buddybot/main.py
```

---

## 🐧 Linux (Ubuntu/Debian)

### 1. Install System Dependencies
```bash
sudo apt update
sudo apt install python3-pyaudio espeak-ng portaudio19-dev
```

### 2. Setup Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull tinyllama
```

### 3. Install & Run
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r buddybot/requirements.txt
export PYTHONPATH=$PYTHONPATH:.
python3 buddybot/main.py
```

---

## 🛠 Operation & Controls

BuddyBot operates in a simple loop:
1. **Selection Menu**:
   - Press **T** for Text: Type your query directly.
   - Press **V** for Voice: Speak into your microphone (max 10 seconds).
   - Press **Q** to Quit.
2. **Thinking**: BuddyBot sends your input to the local `tinyllama` model.
3. **Response**: The answer is printed to the terminal and spoken aloud via offline TTS.

## ❓ Troubleshooting

- **Microphone Error**:
  - Windows: Go to *Settings > Privacy & security > Microphone* and ensure "Microphone access" and "Let desktop apps access your microphone" are ON.
  - Linux: Ensure your user is in the `audio` group: `sudo usermod -aG audio $USER`.
- **Ollama Error**: Ensure the Ollama tray icon is visible or run `ollama serve` in a separate terminal.
- **No Sound**: Ensure `pyttsx3` is using the correct driver. On Linux, `espeak-ng` must be installed.
