import json
import os
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Constants ---
MEMORY_FILE = os.path.join(os.path.dirname(__file__), '..', 'memory', 'long_term.json')
FAISS_INDEX_FILE = os.path.join(os.path.dirname(__file__), '..', 'memory', 'faiss_index.bin')
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
EMBEDDING_MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'embeddings', EMBEDDING_MODEL_NAME)

# --- Globals ---
memory_data = {}
embedding_model = None
faiss_index = None
interaction_texts = []

# --- Functions ---

def _initialize_embedding_model():
    """Initializes the SentenceTransformer model for embeddings."""
    global embedding_model
    if embedding_model is None:
        try:
            logging.info("Loading embedding model...")
            embedding_model = SentenceTransformer(EMBEDDING_MODEL_PATH)
            logging.info("Embedding model loaded successfully.")
        except Exception as e:
            logging.error(f"Failed to load embedding model: {e}")
            raise

def load_memory():
    """
    Loads long-term memory from a JSON file and initializes a FAISS index for
    fast similarity searching of user interactions. This allows BuddyBot to
    quickly find relevant past conversations.
    """
    global memory_data, faiss_index, interaction_texts
    try:
        logging.info("Loading memory...")
        if os.path.exists(MEMORY_FILE):
            with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
                memory_data = json.load(f)
            interaction_texts = [interaction['text'] for interaction in memory_data.get('interactions', [])]
        else:
            memory_data = {"user_preferences": {}, "interactions": [], "facts": {}}

        _initialize_embedding_model()

        if os.path.exists(FAISS_INDEX_FILE):
            faiss_index = faiss.read_index(FAISS_INDEX_FILE)
        elif interaction_texts:
            embeddings = embedding_model.encode(interaction_texts)
            dimension = embeddings.shape[1]
            faiss_index = faiss.IndexFlatL2(dimension)
            faiss_index.add(embeddings)
        logging.info("Memory loaded successfully.")
    except Exception as e:
        logging.error(f"Error loading memory: {e}")

def _save_memory():
    """Saves the current memory data to the JSON file."""
    try:
        with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(memory_data, f, indent=4)
    except Exception as e:
        logging.error(f"Error saving memory file: {e}")

def _save_faiss_index():
    """Saves the FAISS index to a file."""
    if faiss_index:
        try:
            faiss.write_index(faiss_index, FAISS_INDEX_FILE)
        except Exception as e:
            logging.error(f"Error saving FAISS index: {e}")

def store_fact(key: str, value):
    """
    Stores or updates a simple key-value fact in long-term memory.
    """
    if 'facts' not in memory_data:
        memory_data['facts'] = {}
    memory_data['facts'][key] = value
    _save_memory()

def retrieve_fact(key: str):
    """
    Retrieves a fact from long-term memory by its key.
    """
    return memory_data.get('facts', {}).get(key)

def store_interaction(text: str):
    """
    Stores a user interaction, updates the FAISS index, and saves everything.
    """
    global faiss_index, interaction_texts

    try:
        new_interaction = {"text": text}
        if 'interactions' not in memory_data:
            memory_data['interactions'] = []
        memory_data['interactions'].append(new_interaction)
        _save_memory()

        _initialize_embedding_model()
        new_embedding = embedding_model.encode([text])

        if faiss_index is None:
            dimension = new_embedding.shape[1]
            faiss_index = faiss.IndexFlatL2(dimension)

        faiss_index.add(new_embedding)
        interaction_texts.append(text)
        _save_faiss_index()
    except Exception as e:
        logging.error(f"Error storing interaction: {e}")

def find_similar_interactions(query: str, k: int = 3) -> list:
    """
    Finds the top k most similar interactions to a given query.
    """
    if not query or faiss_index is None or not interaction_texts:
        return []

    try:
        _initialize_embedding_model()
        query_embedding = embedding_model.encode([query])
        distances, indices = faiss_index.search(query_embedding, k)

        valid_indices = [i for i in indices[0] if i < len(interaction_texts)]
        return [interaction_texts[i] for i in valid_indices]
    except Exception as e:
        logging.error(f"Error finding similar interactions: {e}")
        return []

if __name__ == '__main__':
    load_memory()
    store_fact("test_key", "test_value")
    print(retrieve_fact("test_key"))
    store_interaction("This is a test interaction.")
    print(find_similar_interactions("test"))
