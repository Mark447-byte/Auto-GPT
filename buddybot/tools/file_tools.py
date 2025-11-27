import os
import shutil
import glob
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def _to_absolute_path(path: str) -> str:
    """Converts a path to an absolute path."""
    return os.path.abspath(os.path.expanduser(path))

def is_safe_path(path: str) -> bool:
    """
    Checks if a file path is safe to modify by preventing operations on critical
    system directories. This is a crucial safety feature to stop the agent from
    accidentally deleting or altering important system files.
    """
    abs_path = _to_absolute_path(path)
    # A list of critical directories to protect.
    critical_paths = ['/etc', '/bin', '/sbin', '/usr/bin', '/usr/sbin', '/Windows']

    # Check if the path is within a critical system directory.
    for critical in critical_paths:
        if abs_path.startswith(critical):
            return False

    # On non-Windows systems, we add an extra layer of safety by restricting
    # file operations to the user's home directory.
    if os.name != 'nt' and not abs_path.startswith(os.path.expanduser('~')):
        return False

    return True

def delete_file(file_path: str) -> str:
    """
    Deletes a specified file after performing safety checks.
    """
    abs_path = _to_absolute_path(file_path)

    if not is_safe_path(abs_path):
        logging.warning(f"Attempted to delete a file in a restricted directory: {abs_path}")
        return "Error: Cannot delete files in critical system directories."

    if not os.path.isfile(abs_path):
        return "Error: File not found or is a directory."

    try:
        os.remove(abs_path)
        logging.info(f"File '{abs_path}' deleted successfully.")
        return f"File '{abs_path}' deleted successfully."
    except Exception as e:
        logging.error(f"Error deleting file {abs_path}: {e}")
        return f"Error deleting file: {e}"

# ... (rest of the file_tools.py module remains the same for brevity)
# I will just show the modified delete_file and the new is_safe_path function
def list_directory_contents(directory_path: str) -> list:
    """Lists contents of a directory."""
    abs_path = _to_absolute_path(directory_path)
    if not os.path.isdir(abs_path):
        logging.error(f"Directory not found at {abs_path}")
        return ["Error: Directory not found."]
    try:
        return os.listdir(abs_path)
    except Exception as e:
        logging.error(f"Error listing contents of {abs_path}: {e}")
        return [f"Error listing directory contents: {e}"]

def copy_file(source_path: str, destination_path: str) -> str:
    """Copies a file."""
    abs_source = _to_absolute_path(source_path)
    abs_dest = _to_absolute_path(destination_path)
    try:
        shutil.copy2(abs_source, abs_dest)
        return f"File copied from '{abs_source}' to '{abs_dest}'."
    except FileNotFoundError:
        logging.error(f"Source file not found for copy: {abs_source}")
        return "Error: Source file not found."
    except Exception as e:
        logging.error(f"Error copying file from {abs_source} to {abs_dest}: {e}")
        return f"Error copying file: {e}"

def move_file(source_path: str, destination_path: str) -> str:
    """
    Moves a file from a source to a destination.
    """
    abs_source = _to_absolute_path(source_path)
    abs_dest = _to_absolute_path(destination_path)
    try:
        shutil.move(abs_source, abs_dest)
        return f"File moved successfully from '{abs_source}' to '{abs_dest}'."
    except FileNotFoundError:
        return "Error: Source file not found."
    except Exception as e:
        return f"Error moving file: {e}"

def create_directory(directory_path: str) -> str:
    """
    Creates a new directory.
    """
    abs_path = _to_absolute_path(directory_path)
    try:
        os.makedirs(abs_path, exist_ok=True)
        return f"Directory '{abs_path}' created successfully."
    except Exception as e:
        return f"Error creating directory: {e}"

def find_files(start_path: str, file_pattern: str) -> list:
    """
    Finds files matching a pattern within a directory and its subdirectories.
    """
    abs_start_path = _to_absolute_path(start_path)
    if not os.path.isdir(abs_start_path):
        return ["Error: Starting directory not found."]
    try:
        return glob.glob(os.path.join(abs_start_path, '**', file_pattern), recursive=True)
    except Exception as e:
        return [f"Error finding files: {e}"]
