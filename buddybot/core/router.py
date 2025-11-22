from buddybot.tools import app_launcher, file_tools, system_tools, web_search, document_tools
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

TOOL_REGISTRY = {
    "open_application": app_launcher.open_application,
    "list_directory_contents": file_tools.list_directory_contents,
    "copy_file": file_tools.copy_file,
    "move_file": file_tools.move_file,
    "delete_file": file_tools.delete_file,
    "create_directory": file_tools.create_directory,
    "find_files": file_tools.find_files,
    "get_system_info": system_tools.get_system_info,
    "get_cpu_usage": system_tools.get_cpu_usage,
    "get_memory_usage": system_tools.get_memory_usage,
    "get_disk_usage": system_tools.get_disk_usage,
    "search_web": web_search.search_web,
    "read_document": document_tools.read_document,
    "summarize_document": document_tools.summarize_document,
}

def run_tool(tool_name: str, **kwargs) -> any:
    """
    Safely executes a tool from the TOOL_REGISTRY.
    """
    if tool_name not in TOOL_REGISTRY:
        logging.warning(f"Attempted to run an invalid tool: '{tool_name}'")
        return f"Error: Tool '{tool_name}' is not a valid or safe tool."

    try:
        logging.info(f"Running tool '{tool_name}' with arguments {kwargs}")
        tool_function = TOOL_REGISTRY[tool_name]
        result = tool_function(**kwargs)
        logging.info(f"Tool '{tool_name}' executed successfully.")
        return result
    except TypeError as e:
        logging.error(f"Incorrect arguments for tool '{tool_name}': {e}")
        return f"Error: Incorrect arguments provided for tool '{tool_name}'."
    except Exception as e:
        logging.error(f"An unexpected error occurred while running tool '{tool_name}': {e}")
        return f"An error occurred while running tool '{tool_name}': {e}"

def get_available_tools() -> list:
    """
    Returns a list of all available tool names.
    """
    return list(TOOL_REGISTRY.keys())

if __name__ == '__main__':
    run_tool('get_cpu_usage')
    run_tool('search_web', query='python programming')
    run_tool('invalid_tool_name')
    run_tool('create_directory', invalid_arg='test')
