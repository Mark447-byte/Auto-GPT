from buddybot.agent.planner import Planner
from buddybot.agent.reflector import Reflector
from buddybot.tools.file_tools import list_files, read_file, write_file
from buddybot.tools.shell_tools import execute_shell

class AgentLoop:
    def __init__(self, llm_client, task_tools, memory):
        self.planner = Planner(llm_client)
        self.reflector = Reflector(llm_client)
        self.task_tools = task_tools
        self.memory = memory
        self.tools = {
            "list_files": list_files,
            "read_file": read_file,
            "write_file": write_file,
            "execute_shell": execute_shell,
            "add_task": self.task_tools.add_task,
            "list_tasks": self.task_tools.list_tasks,
            "complete_task": self.task_tools.complete_task
        }

    def run(self, user_goal):
        print(f"BuddyBot: Planning for goal: {user_goal}")
        plan = self.planner.plan(user_goal)

        final_response = ""
        for step in plan:
            print(f"BuddyBot: Executing step: {step.get('description')}")
            tool_name = step.get('tool')
            args = step.get('args', {})

            if tool_name in self.tools:
                try:
                    result = self.tools[tool_name](**args)
                except Exception as e:
                    result = f"Error executing tool: {str(e)}"
            else:
                result = f"No tool found for: {tool_name}"

            print(f"BuddyBot: Result: {result}")

            should_continue, reflection = self.reflector.reflect(step, result)
            final_response += f"Step: {step.get('description')}\nResult: {result}\nReflection: {reflection}\n\n"

            if not should_continue:
                print("BuddyBot: Stopping based on reflection.")
                break

        self.memory.store_interaction(user_goal, final_response)
        return final_response
