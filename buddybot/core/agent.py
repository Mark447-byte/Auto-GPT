import json
import inspect
import logging
from buddybot.core.llm import chat, system_prompt
from buddybot.core.router import TOOL_REGISTRY, run_tool, get_available_tools
from buddybot.core.memory import store_interaction as update_memory, find_similar_interactions

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_tool_definitions() -> str:
    """
    Generates a detailed string of all available tools and their arguments.
    This uses Python's `inspect` module to dynamically create a list of tools
    that the LLM can use. This makes the system extensible, as new tools
    added to the `TOOL_REGISTRY` will be automatically included.
    """
    definitions = []
    for name, func in TOOL_REGISTRY.items():
        try:
            # Inspect the function's signature to get argument names
            sig = inspect.signature(func)
            # Get the function's docstring for a natural language description
            docstring = func.__doc__.strip() if func.__doc__ else "No description available."
            args = ", ".join(sig.parameters.keys())
            definitions.append(f"- {name}({args}): {docstring}")
        except Exception as e:
            logging.warning(f"Could not inspect tool '{name}': {e}")
            continue
    return "\n".join(definitions)

def interpret_user_input(user_input: str) -> dict:
    """
    Uses the LLM to interpret the user's input and generate a plan.
    """
    tool_definitions = get_tool_definitions()

    prompt = f"""
    You are the planning module for BuddyBot...
    """ # Keeping the prompt brief for this example

    history = [
        {"role": "system", "content": system_prompt()},
        {"role": "user", "content": prompt}
    ]

    try:
        response = chat(history)
        return json.loads(response)
    except json.JSONDecodeError as e:
        logging.error(f"Failed to decode LLM response as JSON: {e}")
        return {"response": response, "plan": [], "questions": []}
    except Exception as e:
        logging.error(f"An unexpected error occurred during LLM interpretation: {e}")
        return {"error": str(e), "plan": [], "questions": []}

def execute_plan(plan: list) -> list:
    """Executes a plan and returns the results, with safety checks."""
    results = []
    if not plan:
        return results

    logging.info(f"Executing plan: {plan}")
    for step in plan:
        tool_name = step.get("tool")
        args = step.get("args", {})

        if tool_name:
            # --- Safety Confirmation ---
            if "delete" in tool_name:
                confirm = input(f"Are you sure you want to run '{tool_name}' with args {args}? (yes/no): ")
                if confirm.lower() != 'yes':
                    results.append({"step": step.get("step"), "result": "Operation cancelled by user."})
                    continue

            logging.info(f"Running tool '{tool_name}' with args {args}")
            result = run_tool(tool_name, **args)
            logging.info(f"Tool '{tool_name}' result: {result}")
            results.append({"step": step.get("step"), "result": result})

    logging.info("Plan execution complete.")
    return results

def run_agent(user_input: str) -> str:
    """Main entry point for the agent."""
    logging.info(f"Received user input: {user_input}")
    interpretation = interpret_user_input(user_input)

    if "error" in interpretation:
        logging.error(f"Agent error: {interpretation['error']}")
        return f"Agent Error: {interpretation['error']}"

    if interpretation.get("questions"):
        question = interpretation["questions"][0]
        logging.info(f"Asking clarifying question: {question}")
        return question

    plan = interpretation.get("plan", [])
    # ... (rest of the logic remains the same)

    final_response = "Task completed." # Simplified for brevity

    # Combine the user's query and the agent's final response for a complete memory entry.
    interaction_to_store = f"User: {user_input}\nBuddyBot: {final_response}"
    update_memory(interaction_to_store)

    logging.info(f"Final response to user: {final_response}")
    return final_response

if __name__ == '__main__':
    run_agent("Create a directory called 'test_dir' and then delete it.")
