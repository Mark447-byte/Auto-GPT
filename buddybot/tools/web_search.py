from duckduckgo_search import DDGS

def search_web(query: str, max_results: int = 5) -> list:
    """
    Performs a web search using DuckDuckGo and returns the top results.

    Args:
        query (str): The search query.
        max_results (int): The maximum number of results to return.

    Returns:
        list: A list of dictionaries, where each dictionary contains the title,
              link, and snippet of a search result.
    """
    if not query:
        return ["Error: No search query provided."]

    try:
        with DDGS() as ddgs:
            results = [r for r in ddgs.text(query, max_results=max_results)]

        if not results:
            return ["No results found for your query."]

        return results

    except Exception as e:
        return [f"An error occurred during the web search: {e}"]

if __name__ == '__main__':
    print("--- Testing Web Search Tool ---")

    test_query = "What is the capital of France?"
    search_results = search_web(test_query)

    print(f"Search results for: '{test_query}'")
    for result in search_results:
        print(f"  Title: {result.get('title')}")
        print(f"  Link: {result.get('href')}")
        print(f"  Snippet: {result.get('body')}")
        print("-" * 20)

    print("--- Web Search Test Complete ---")
