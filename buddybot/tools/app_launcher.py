import subprocess
import platform

def open_application(app_name: str) -> str:
    """
    Opens a specified application.
    NOTE: This is a simulated function for use in a sandboxed environment.
    In a real desktop environment, the subprocess.Popen calls would be used.
    """
    os_type = platform.system()

    # Sanitize app_name to prevent command injection
    safe_app_name = "".join(c for c in app_name if c.isalnum() or c in (' ', '-', '_'))

    print(f"Attempting to open application: {safe_app_name}")

    try:
        if os_type == "Windows":
            # On a real Windows system, this would open the app
            # subprocess.Popen(['start', safe_app_name], shell=True)
            return f"Simulated opening '{safe_app_name}' on Windows."
        elif os_type == "Darwin": # macOS
            # subprocess.Popen(['open', '-a', safe_app_name])
            return f"Simulated opening '{safe_app_name}' on macOS."
        else: # Linux
            # subprocess.Popen([safe_app_name])
            return f"Simulated opening '{safe_app_name}' on Linux."

    except FileNotFoundError:
        return f"Application '{safe_app_name}' not found."
    except Exception as e:
        return f"An error occurred while trying to open '{safe_app_name}': {e}"

if __name__ == '__main__':
    # Test cases
    print(open_application("notepad"))
    print(open_application("Chrome"))
    print(open_application("non_existent_app"))
