import tkinter as tk
from tkinter import scrolledtext
import threading
from buddybot.core.llm import BuddyLLM
from buddybot.core.stt import BuddySTT
from buddybot.core.tts import BuddyTTS
from buddybot.agent.loop import AgentLoop
from buddybot.memory.long_term import LongTermMemory
from buddybot.memory.short_term import ShortTermMemory
from buddybot.tools.task_tools import TaskTools

class BuddyGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("BuddyBot - AI Personal Assistant")
        self.root.geometry("600x500")

        # Initialize Core & Agent Components
        self.llm = BuddyLLM()
        self.stt = BuddySTT()
        self.tts = BuddyTTS()
        self.long_term_mem = LongTermMemory()
        self.short_term_mem = ShortTermMemory()
        self.task_tools = TaskTools(self.long_term_mem)
        self.agent = AgentLoop(self.llm, self.task_tools, self.long_term_mem, self.short_term_mem)

        self.setup_ui()

        # Start background wake word listener
        self.stop_listening = self.stt.listen_continuously(self.on_wake_word_triggered)

        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)

    def setup_ui(self):
        self.chat_history = scrolledtext.ScrolledText(self.root, wrap=tk.WORD, state='disabled')
        self.chat_history.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

        self.input_frame = tk.Frame(self.root)
        self.input_frame.pack(padx=10, pady=10, fill=tk.X)

        self.user_input = tk.Entry(self.input_frame)
        self.user_input.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 10))
        self.user_input.bind("<Return>", lambda event: self.send_message())

        self.send_button = tk.Button(self.input_frame, text="Send", command=self.send_message)
        self.send_button.pack(side=tk.RIGHT)

        self.display_message("BuddyBot", "Hello! I am BuddyBot. Say 'Hey Buddy' or type below.")

    def display_message(self, sender, message):
        self.chat_history.configure(state='normal')
        self.chat_history.insert(tk.END, f"{sender}: {message}\n\n")
        self.chat_history.configure(state='disabled')
        self.chat_history.see(tk.END)

    def on_wake_word_triggered(self):
        self.root.after(0, self.start_voice_capture)

    def start_voice_capture(self):
        self.display_message("System", "Wake word detected! Listening...")
        self.tts.speak("Yes?")
        threading.Thread(target=self.process_voice, daemon=True).start()

    def process_voice(self):
        command = self.stt.capture_command()
        if command:
            self.root.after(0, lambda: self.display_message("You (voice)", command))
            self.process_goal(command)
        else:
            self.root.after(0, lambda: self.display_message("System", "No voice command detected."))

    def send_message(self):
        message = self.user_input.get().strip()
        if not message:
            return
        self.user_input.delete(0, tk.END)
        self.display_message("You", message)
        threading.Thread(target=self.process_goal, args=(message,), daemon=True).start()

    def process_goal(self, goal):
        self.root.after(0, lambda: self.display_message("BuddyBot", "Planning and executing..."))
        response_details = self.agent.run(goal)

        summary_prompt = f"Summarize the following execution results for the user in one or two friendly sentences:\n{response_details}"
        friendly_summary = self.llm.generate(summary_prompt)

        self.root.after(0, lambda: self.display_message("BuddyBot", friendly_summary))
        self.tts.speak(friendly_summary)

    def on_closing(self):
        if self.stop_listening:
            self.stop_listening(wait_for_stop=False)
        self.root.destroy()

def start_gui():
    root = tk.Tk()
    app = BuddyGUI(root)
    root.mainloop()

if __name__ == "__main__":
    start_gui()
