import pytest
from unittest.mock import MagicMock
from buddybot.agent.loop import AgentLoop

def test_agent_loop_basic():
    # Mock LLM Client
    mock_llm = MagicMock()
    # Mock planner response (JSON steps)
    mock_llm.generate.side_effect = [
        '[{"description": "Test step", "tool": "list_files", "args": {"directory": "."}}]', # Planner
        'CONTINUE - Step succeeded' # Reflector
    ]

    # Mock TaskTools
    mock_task_tools = MagicMock()

    # Mock Memory
    mock_memory = MagicMock()

    agent = AgentLoop(mock_llm, mock_task_tools, mock_memory)

    response = agent.run("Test goal")

    assert "Test step" in response
    assert mock_llm.generate.call_count == 2
    mock_memory.store_interaction.assert_called_once()

def test_planner_parsing_error():
    mock_llm = MagicMock()
    mock_llm.generate.return_value = "No JSON here"

    from buddybot.agent.planner import Planner
    planner = Planner(mock_llm)
    plan = planner.plan("goal")

    assert "Error" in plan[0]["description"]
