# BuddyBot User Manual

This user manual provides detailed instructions on how to use BuddyBot.

## Table of Contents

1.  [Installation](#installation)
2.  [Running BuddyBot](#running-buddybot)
3.  [Using the Command-Line Interface (CLI)](#using-the-command-line-interface-cli)
4.  [Using the Desktop GUI](#using-the-desktop-gui)
5.  [Commands](#commands)
    *   [Application Launcher](#application-launcher)
    *   [File System Operations](#file-system-operations)
    *   [Web Search](#web-search)
    *   [Document Reading and Summarization](#document-reading-and-summarization)
    *   [System Information](#system-information)
    *   [Memory](#memory)

## Installation

To install BuddyBot, please refer to the [Getting Started](#getting-started) section in the `README.md` file.

## Running BuddyBot

You can run BuddyBot in two modes:

-   **Command-Line Interface (CLI)**: This is a text-based interface that is ideal for developers and users who prefer to work in the terminal.
-   **Desktop GUI**: This is a graphical user interface that is more user-friendly and provides a more visual experience.

To run the CLI, use the following command: `python buddybot/main.py --cli`

To run the GUI, use the following command: `python buddybot/main.py`

## Using the Command-Line Interface (CLI)

The CLI is a simple and efficient way to interact with BuddyBot. When you start the CLI, you will be prompted to enter a command. You can type your command and press Enter to execute it.

## Using the Desktop GUI

The desktop GUI provides a more user-friendly and interactive experience. The GUI consists of the following components:

-   **Main Window**: The main window of the application, which displays the conversation history.
-   **Input Bar**: The input bar, where you can type your commands.
-   **Send Button**: The send button, which you can click to send your command.
-   **Settings**: The settings, where you can configure the application.

## Commands

BuddyBot supports a wide range of commands, including:

### Application Launcher

-   `open <application_name>`: Opens the specified application.

### File System Operations

-   `create file <file_path>`: Creates a new file at the specified path.
-   `copy file <source_path> <destination_path>`: Copies a file from the source path to the destination path.
-   `move file <source_path> <destination_path>`: Moves a file from the source path to the destination path.
-   `delete file <file_path>`: Deletes the specified file.
-   `find file <file_name>`: Finds a file with the specified name.

### Web Search

-   `search <query>`: Searches the web for the specified query.

### Document Reading and Summarization

-   `read <file_path>`: Reads the specified file.
-   `summarize <file_path>`: Summarizes the specified file.

### System Information

-   `system info`: Displays information about your computer's hardware and software.

### Memory

-   `remember <key> <value>`: Remembers a key-value pair.
-   `recall <key>`: Recalls the value associated with the specified key.
-   `forget <key>`: Forgets the specified key-value pair.
