import os
import shutil
import glob

def _to_absolute_path(path: str) -> str:
    """Converts a path to an absolute path, expanding the user's home directory."""
    return os.path.abspath(os.path.expanduser(path))

def list_directory_contents(directory_path: str) -> list:
    """
    Lists all files and folders in a given directory.
    """
    abs_path = _to_absolute_path(directory_path)
    if not os.path.isdir(abs_path):
        return ["Error: Directory not found."]
    try:
        return os.listdir(abs_path)
    except Exception as e:
        return [f"Error listing directory contents: {e}"]

def copy_file(source_path: str, destination_path: str) -> str:
    """
    Copies a file from a source to a destination.
    """
    abs_source = _to_absolute_path(source_path)
    abs_dest = _to_absolute_path(destination_path)
    try:
        shutil.copy2(abs_source, abs_dest)
        return f"File copied successfully from '{abs_source}' to '{abs_dest}'."
    except FileNotFoundError:
        return "Error: Source file not found."
    except Exception as e:
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

def delete_file(file_path: str) -> str:
    """
    Deletes a specified file.
    """
    abs_path = _to_absolute_path(file_path)
    if not os.path.isfile(abs_path):
        return "Error: File not found or is a directory."
    try:
        os.remove(abs_path)
        return f"File '{abs_path}' deleted successfully."
    except Exception as e:
        return f"Error deleting file: {e}"

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

if __name__ == '__main__':
    # Setup a test environment in the current working directory
    test_dir = "file_tools_test_abs"
    create_directory(test_dir)
    test_file_path = os.path.join(test_dir, "test_file.txt")
    with open(test_file_path, "w") as f:
        f.write("This is a test.")

    print("--- Testing File Tools with Absolute Paths ---")
    print(f"Contents of '{test_dir}': {list_directory_contents(test_dir)}")
    copy_dest = os.path.join(test_dir, "copy.txt")
    print(copy_file(test_file_path, copy_dest))
    print(f"Contents after copy: {list_directory_contents(test_dir)}")
    move_dest = os.path.join(test_dir, "moved.txt")
    print(move_file(copy_dest, move_dest))
    print(f"Contents after move: {list_directory_contents(test_dir)}")
    print(find_files(test_dir, "*.txt"))
    print(delete_file(test_file_path))
    print(delete_file(move_dest))
    print(f"Contents after delete: {list_directory_contents(test_dir)}")

    # Cleanup
    shutil.rmtree(test_dir)
    print("--- Test Cleanup Complete ---")
