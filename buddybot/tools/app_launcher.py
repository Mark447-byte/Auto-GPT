import subprocess
import platform
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def open_application(app_name: str) -> str:
    """
    Opens a specified application using the appropriate command for the OS.
    """
    os_type = platform.system()
    safe_app_name = "".join(c for c in app_name if c.isalnum() or c in (' ', '-', '_'))

    logging.info(f"Attempting to open application: {safe_app_name}")

    try:
        if os_type == "Windows":
            subprocess.Popen(['start', safe_app_name], shell=True)
            return f"Successfully launched '{safe_app_name}' on Windows."
        elif os_type == "Darwin": # macOS
            subprocess.Popen(['open', '-a', safe_app_name])
            return f"Successfully launched '{safe_app_name}' on macOS."
        else: # Linux
            subprocess.Popen([safe_app_name])
            return f"Successfully launched '{safe_app_name}' on Linux."

    except FileNotFoundError:
        logging.error(f"Application '{safe_app_name}' not found.")
        return f"Application '{safe_app_name}' not found."
    except Exception as e:
        logging.error(f"An error occurred while trying to open '{safe_app_name}': {e}")
        return f"An error occurred while trying to open '{safe_app_name}': {e}"

if __name__ == '__main__':
    # These will likely fail in a sandboxed environment but would work on a real desktop
    open_application("notepad")
    open_application("calculator")
