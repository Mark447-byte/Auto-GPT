class Reflector:
    def __init__(self, llm_client):
        self.llm_client = llm_client

    def reflect(self, step, result):
        prompt = f"""
Step executed: {step}
Result: {result}

Did the step succeed? Should the agent continue or stop?
Respond with 'CONTINUE' or 'STOP' followed by a brief reason.
"""
        response = self.llm_client.generate(prompt)
        if "STOP" in response.upper():
            return False, response
        return True, response
