import json

class Planner:
    def __init__(self, llm_client):
        self.llm_client = llm_client

    def plan(self, user_goal, context=""):
        prompt = f"""
You are BuddyBot, a local agentic assistant.
User Goal: {user_goal}
Context: {context}

Break down the user goal into a list of steps.
Available tools:
- list_files(directory)
- read_file(filepath)
- write_file(filepath, content)
- add_task(content)
- list_tasks(status)
- complete_task(task_id)
- execute_shell(command)

Output only a JSON list of steps. Each step should have a 'description' and a 'tool' if applicable (with 'args').
Example:
[
  {{"description": "List files in current directory", "tool": "list_files", "args": {{"directory": "."}}}}
]
"""
        response = self.llm_client.generate(prompt)
        try:
            # Try to find JSON in the response
            start = response.find('[')
            end = response.rfind(']') + 1
            if start != -1 and end != -1:
                return json.loads(response[start:end])
            return [{"description": "Error: LLM did not return a valid JSON list of steps.", "response": response}]
        except Exception as e:
            return [{"description": f"Error parsing plan: {str(e)}", "response": response}]
