import subprocess
import shlex

def execute_shell(command):
    """
    Executes a shell command safely without shell=True.
    """
    try:
        # Split the command string into a list of arguments for safer execution
        args = shlex.split(command)

        # Execute the command without using the shell
        result = subprocess.run(args, shell=False, capture_output=True, text=True, timeout=10)

        if result.returncode == 0:
            return result.stdout.strip()
        else:
            return f"Error: {result.stderr.strip()}"
    except Exception as e:
        return f"Execution failed: {str(e)}"
