import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout,
                               QHBoxLayout, QTextEdit, QLineEdit, QPushButton,
                               QStackedWidget, QListWidget, QListWidgetItem,
                               QSystemTrayIcon, QMenu)
from PySide6.QtGui import QIcon
from buddybot.core.agent import run_agent
from buddybot.core.tts import speak

class SettingsPage(QWidget):
    """A simple settings page."""
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        self.setLayout(layout)

        layout.addWidget(QPushButton("Toggle Online/Offline (Not Implemented)"))
        layout.addWidget(QPushButton("Clear Memory (Not Implemented)"))

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("BuddyBot")
        self.setGeometry(100, 100, 800, 600)

        # Main layout
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        main_layout = QHBoxLayout(main_widget)

        # Sidebar for navigation
        self.sidebar = QListWidget()
        self.sidebar.setMaximumWidth(150)
        main_layout.addWidget(self.sidebar)

        # Stacked widget for different pages (main chat, settings)
        self.stacked_widget = QStackedWidget()
        main_layout.addWidget(self.stacked_widget)

        # --- Main Chat Page ---
        chat_widget = QWidget()
        chat_layout = QVBoxLayout(chat_widget)

        self.output_console = QTextEdit()
        self.output_console.setReadOnly(True)
        chat_layout.addWidget(self.output_console)

        input_layout = QHBoxLayout()
        self.text_input = QLineEdit()
        self.text_input.setPlaceholderText("Type your command...")
        self.text_input.returnPressed.connect(self.handle_user_input)
        input_layout.addWidget(self.text_input)

        self.voice_button = QPushButton("🎤 Voice")
        self.voice_button.clicked.connect(self.handle_voice_input)
        input_layout.addWidget(self.voice_button)

        chat_layout.addLayout(input_layout)
        self.stacked_widget.addWidget(chat_widget)

        # --- Settings Page ---
        settings_page = SettingsPage()
        self.stacked_widget.addWidget(settings_page)

        # --- Sidebar Navigation ---
        self.sidebar.addItem(QListWidgetItem("Chat"))
        self.sidebar.addItem(QListWidgetItem("Settings"))
        self.sidebar.currentRowChanged.connect(self.stacked_widget.setCurrentIndex)

        # --- System Tray Icon ---
        if QSystemTrayIcon.isSystemTrayAvailable():
            self.tray_icon = QSystemTrayIcon(self)
            self.tray_icon.setToolTip("BuddyBot")

            tray_menu = QMenu()
            show_action = tray_menu.addAction("Show")
            show_action.triggered.connect(self.show)
            quit_action = tray_menu.addAction("Quit")
            quit_action.triggered.connect(QApplication.instance().quit)

            self.tray_icon.setContextMenu(tray_menu)
            self.tray_icon.show()

    def handle_user_input(self):
        user_text = self.text_input.text()
        if not user_text:
            return

        self.output_console.append(f"You: {user_text}")
        self.text_input.clear()

        # Run agent and display response
        agent_response = run_agent(user_text)
        self.output_console.append(f"BuddyBot: {agent_response}")
        speak(agent_response)

    def handle_voice_input(self):
        # Placeholder for voice input functionality
        self.output_console.append("BuddyBot: Voice input is not yet implemented.")

def start_gui():
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())

if __name__ == '__main__':
    start_gui()
