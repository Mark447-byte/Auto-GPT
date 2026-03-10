import pytest
from buddybot.core.llm import BuddyLLM, TransformersProvider
from unittest.mock import MagicMock, patch

def test_llm_initialization():
    llm = BuddyLLM(config={'llm': {'provider': 'transformers'}})
    assert isinstance(llm.provider, TransformersProvider)

@patch("transformers.AutoTokenizer.from_pretrained")
@patch("transformers.AutoModelForCausalLM.from_pretrained")
def test_transformers_load_model(mock_model, mock_tokenizer):
    provider = TransformersProvider()
    provider.load_model()
    assert provider.model is not None
    assert provider.tokenizer is not None
    mock_model.assert_called_once()
    mock_tokenizer.assert_called_once()

@patch("buddybot.core.llm.TransformersProvider.load_model")
def test_generate_calls_load(mock_load):
    provider = TransformersProvider()
    provider.tokenizer = MagicMock()
    provider.model = MagicMock()

    provider.tokenizer.apply_chat_template.return_value = "prompt"
    provider.tokenizer.return_value.to.return_value = {"input_ids": []}
    provider.model.generate.return_value = [[]]
    provider.tokenizer.decode.return_value = "<|assistant|> Hello"

    provider.generate("Hi")
    mock_load.assert_called_once()
