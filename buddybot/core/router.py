from buddybot.tools import app_launcher, file_tools, system_tools, web_search, document_tools

# A dictionary that maps safe, callable tool names to their actual functions
# This acts as a security layer, preventing the LLM from calling arbitrary code.
TOOL_REGISTRY = {
    # App Launcher Tools
    "open_application": app_launcher.open_application,

    # File Tools
    "list_directory_contents": file_tools.list_directory_contents,
    "copy_file": file_tools.copy_file,
    "move_file": file_tools.move_file,
    "delete_file": file_tools.delete_file,
    "create_directory": file_tools.create_directory,
    "find_files": file_tools.find_files,

    # System Tools
    "get_system_info": system_tools.get_system_info,
    "get_cpu_usage": system_tools.get_cpu_usage,
    "get_memory_usage": system_tools.get_memory_usage,
    "get_disk_usage": system_tools.get_disk_usage,

    # Web Search Tools
    "search_web": web_search.search_web,

    # Document Tools
    "read_document": document_tools.read_document,
    "summarize_document": document_tools.summarize_document,
}

def run_tool(tool_name: str, **kwargs) -> any:
    """
    Safely executes a tool from the TOOL_REGISTRY.

    Args:
        tool_name (str): The name of the tool to run.
        **kwargs: The arguments to pass to the tool function.

    Returns:
        The result of the tool's execution, or an error message if the tool
        is not found or if an error occurs.
    """
    if tool_name not in TOOL_REGISTRY:
        return f"Error: Tool '{tool_name}' is not a valid or safe tool."

    try:
        tool_function = TOOL_REGISTRY[tool_name]
        return tool_function(**kwargs)
    except Exception as e:
        return f"An error occurred while running tool '{tool_name}': {e}"

def get_available_tools() -> list:
    """
    Returns a list of all available tool names.
    """
    return list(TOOL_REGISTRY.keys())

if __name__ == '__main__':
    print("--- Testing Tool Router ---")

    # Test a valid tool
    print(f"Running 'get_cpu_usage': {run_tool('get_cpu_usage')}")

    # Test a tool with arguments
    print(f"Running 'search_web': {run_tool('search_web', query='python')}")

    # Test an invalid tool
    print(f"Running 'invalid_tool': {run_tool('invalid_tool')}")

    # List available tools
    print(f"\nAvailable tools: {get_available_tools()}")

    print("--- Tool Router Test Complete ---")
