import json
import inspect
from buddybot.core.llm import chat, system_prompt
from buddybot.core.router import TOOL_REGISTRY, run_tool, get_available_tools
from buddybot.core.memory import store_interaction, find_similar_interactions

def get_tool_definitions() -> str:
    """
    Generates a detailed string of all available tools and their arguments.
    """
    definitions = []
    for name, func in TOOL_REGISTRY.items():
        try:
            sig = inspect.signature(func)
            docstring = func.__doc__.strip() if func.__doc__ else "No description available."

            # Simplified args: just the names
            args = ", ".join(sig.parameters.keys())

            definitions.append(f"- {name}({args}): {docstring}")
        except:
            # Skip any tools that can't be inspected
            continue
    return "\n".join(definitions)

def interpret_user_input(user_input: str) -> dict:
    """
    Uses the LLM to interpret the user's input and generate a plan.
    """
    tool_definitions = get_tool_definitions()

    prompt = f"""
    You are the planning module for BuddyBot, an AI assistant.
    Your task is to interpret the user's request and create a step-by-step plan to accomplish it.

    Here are the available tools:
    {tool_definitions}

    User request: "{user_input}"

    Based on the request, generate a JSON plan with the following structure:
    {{
      "thought": "A brief analysis of the user's request.",
      "plan": [
        {{
          "step": 1,
          "tool": "tool_name",
          "args": {{ "arg_name": "value" }}
        }},
        ...
      ],
      "questions": ["Any clarifying questions if the request is ambiguous."],
      "response": "A final response after the plan is executed."
    }}

    - Only use the tools listed above.
    - Ensure the 'args' dictionary keys match the argument names in the tool definitions exactly.
    - If the request is ambiguous, populate 'questions'.
    - If no tools are needed, provide a direct 'response'.
    """

    history = [
        {"role": "system", "content": system_prompt()},
        {"role": "user", "content": prompt}
    ]

    try:
        response = chat(history)
        return json.loads(response)
    except json.JSONDecodeError:
        return {"response": response, "plan": [], "questions": []}
    except Exception as e:
        return {"error": str(e), "plan": [], "questions": []}

def execute_plan(plan: list) -> list:
    """Executes a plan and returns the results, with detailed logging."""
    results = []
    if not plan:
        return results

    print("\n--- Executing Plan ---")
    for step in plan:
        tool_name = step.get("tool")
        args = step.get("args", {})

        if tool_name:
            print(f"Step {step.get('step')}: Running tool '{tool_name}' with args {args}")
            result = run_tool(tool_name, **args)
            print(f"Step {step.get('step')} Result: {result}")
            results.append({"step": step.get("step"), "result": result})
    print("--- Plan Execution Complete ---\n")
    return results

def ask_clarifying_question(questions: list) -> str:
    """Returns the first clarifying question."""
    return questions[0] if questions else ""

def update_memory(user_input: str, response: str):
    """Updates the memory with the interaction."""
    store_interaction(f"User: {user_input}\nBuddyBot: {response}")

def run_agent(user_input: str) -> str:
    """Main entry point for the agent."""
    interpretation = interpret_user_input(user_input)
    print(f"--- AGENT: Raw Interpretation ---\n{interpretation}\n---------------------------------")

    if "error" in interpretation:
        return f"Agent Error: {interpretation['error']}"

    if interpretation.get("questions"):
        return ask_clarifying_question(interpretation["questions"])

    plan = interpretation.get("plan", [])
    if isinstance(plan, str):
        try:
            plan_data = json.loads(plan)
            plan = plan_data.get("plan", [])
        except json.JSONDecodeError:
            plan = []

    # Check for nested JSON in the response field
    response_str = interpretation.get("response", "")
    if response_str.strip().startswith("{"):
        try:
            response_data = json.loads(response_str)
            if "plan" in response_data:
                plan = response_data["plan"]
        except json.JSONDecodeError:
            pass # Not a JSON string, proceed as normal

    print(f"--- AGENT: Final Plan to Execute ---\n{plan}\n------------------------------------")
    execution_results = execute_plan(plan)

    final_response = interpretation.get("response", "Task completed.")
    if execution_results:
        final_response += "\n\nTool Results:\n"
        for res in execution_results:
            final_response += f"Step {res['step']}: {res['result']}\n"

    update_memory(user_input, final_response)
    return final_response

if __name__ == '__main__':
    import os
    import shutil
    print("--- Testing Agent Brain ---")
    test_input = "Create a directory called 'agent_test' and then list its contents."
    print(f"\nUser Request: {test_input}")
    response = run_agent(test_input)
    print(f"BuddyBot Response:\n{response}")

    if os.path.exists('agent_test'):
        shutil.rmtree('agent_test')
