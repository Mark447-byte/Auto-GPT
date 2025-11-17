import os
import PyPDF2
from docx import Document
from buddybot.core.llm import generate as summarize_text

def read_txt(file_path: str) -> str:
    """Reads the content of a .txt file."""
    if not os.path.exists(file_path):
        return "Error: File not found."
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading .txt file: {e}"

def read_pdf(file_path: str) -> str:
    """Reads the text content of a .pdf file."""
    if not os.path.exists(file_path):
        return "Error: File not found."
    try:
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        return f"Error reading .pdf file: {e}"

def read_docx(file_path: str) -> str:
    """Reads the content of a .docx file."""
    if not os.path.exists(file_path):
        return "Error: File not found."
    try:
        doc = Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        return f"Error reading .docx file: {e}"

def read_document(file_path: str) -> str:
    """
    Reads a document based on its file extension.
    """
    _, extension = os.path.splitext(file_path)
    extension = extension.lower()

    if extension == '.txt':
        return read_txt(file_path)
    elif extension == '.pdf':
        return read_pdf(file_path)
    elif extension == '.docx':
        return read_docx(file_path)
    else:
        return "Error: Unsupported file type. Can only read .txt, .pdf, and .docx files."

def summarize_document(file_path: str, summary_length: int = 150) -> str:
    """
    Summarizes the content of a given document.
    """
    content = read_document(file_path)
    if content.startswith("Error:"):
        return content

    if not content:
        return "Error: Document is empty or could not be read."

    prompt = f"Please summarize the following document in approximately {summary_length} words:\n\n{content}"

    summary = summarize_text(prompt, max_tokens=summary_length + 50) # Allow some buffer
    return summary

if __name__ == '__main__':
    # Create dummy files for testing
    test_dir = "doc_tools_test"
    os.makedirs(test_dir, exist_ok=True)

    txt_content = "This is a test text file. It contains a simple sentence for testing purposes."
    txt_path = os.path.join(test_dir, "test.txt")
    with open(txt_path, "w") as f:
        f.write(txt_content)

    # NOTE: PDF and DOCX tests are harder to create on the fly.
    # We will just test the reading of the TXT file and the summarization part.

    print("--- Testing Document Tools ---")

    # Test reading
    print(f"Reading TXT file: {read_document(txt_path)}")

    # Test summarization
    print("\n--- Testing Summarization ---")
    summary = summarize_document(txt_path)
    print(f"Summary of the TXT file: {summary}")

    # Cleanup
    import shutil
    shutil.rmtree(test_dir)
    print("\n--- Test Cleanup Complete ---")
