from duckduckgo_search import DDGS
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def search_web(query: str, max_results: int = 5) -> list:
    """
    Performs a web search using DuckDuckGo.
    """
    if not query:
        logging.warning("No search query provided.")
        return ["Error: No search query provided."]

    try:
        logging.info(f"Performing web search for: '{query}'")
        with DDGS() as ddgs:
            results = [r for r in ddgs.text(query, max_results=max_results)]

        if not results:
            logging.info(f"No results found for query: '{query}'")
            return ["No results found for your query."]

        logging.info(f"Found {len(results)} results for query: '{query}'")
        return results

    except Exception as e:
        logging.error(f"An error occurred during web search for '{query}': {e}")
        return [f"An error occurred during the web search: {e}"]

if __name__ == '__main__':
    search_web("What is the capital of France?")
