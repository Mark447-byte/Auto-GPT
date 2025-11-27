# BuddyBot: Your AI Personal Assistant

BuddyBot is an AI-powered personal assistant for Windows that enables users to interact with their computer through natural voice and text commands.

## Features

- **Voice and Text Commands**: Interact with your computer using natural language.
- **Offline and Online Modes**: BuddyBot can run entirely offline, or it can connect to online services for enhanced capabilities.
- **Application Launcher**: Open any application on your computer with a simple command.
- **File System Operations**: Create, copy, move, delete, and find files and directories.
- **Web Search**: Get information from the web.
- **Document Reading and Summarization**: Read and summarize text from various document formats.
- **System Information**: Get information about your computer's hardware and software.
- **Memory**: BuddyBot can remember your preferences and past interactions.

## Architecture

BuddyBot is built with a modular architecture that consists of the following components:

- **Core**: The core of the application, which includes the agent, LLM, memory, and tool router.
- **Tools**: A collection of modules that provide the agent with its capabilities.
- **UI**: The user interface, which includes a command-line interface (CLI) and a desktop GUI.

## Getting Started

To get started with BuddyBot, you will need to have Python 3.10 or higher installed. You will also need to install the required dependencies.

### Installation

1. Clone the repository: `git clone https://github.com/your-username/buddybot.git`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `venv\Scripts\activate`
4. Install the dependencies: `pip install -r buddybot/requirements.txt`
5. Download the required models:
   - **LLM Model**: Download the `Phi-3-mini-4k-instruct-q4.gguf` model from [here](https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF) and place it in the `buddybot/models/llm` directory.
   - **STT Model**: Download the `ggml-base.en.bin` model from [here](https://huggingface.co/ggerganov/whisper.cpp/tree/main) and place it in the `buddybot/models/stt` directory.
   - **Embedding Model**: The embedding model will be downloaded automatically on first run.

### Usage

To run BuddyBot, you can use either the CLI or the desktop GUI.

- To run the CLI: `python buddybot/main.py --cli`
- To run the GUI: `python buddybot/main.py`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
