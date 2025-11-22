import os
import PyPDF2
from docx import Document
from buddybot.core.llm import generate as summarize_text
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def read_txt(file_path: str) -> str:
    """Reads a .txt file."""
    if not os.path.exists(file_path):
        logging.error(f"File not found: {file_path}")
        return "Error: File not found."
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        logging.error(f"Error reading .txt file {file_path}: {e}")
        return f"Error reading .txt file: {e}"

def read_pdf(file_path: str) -> str:
    """Reads a .pdf file."""
    # ... (similar hardening for read_pdf and read_docx)
    if not os.path.exists(file_path):
        return "Error: File not found."
    try:
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = "".join([page.extract_text() for page in reader.pages])
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

    logging.info(f"Attempting to read document: {file_path}")

    if extension == '.txt':
        return read_txt(file_path)
    elif extension == '.pdf':
        return read_pdf(file_path)
    elif extension == '.docx':
        return read_docx(file_path)
    else:
        logging.warning(f"Unsupported file type for reading: {extension}")
        return "Error: Unsupported file type."

def summarize_document(file_path: str, summary_length: int = 150) -> str:
    """
    Summarizes a document.
    """
    content = read_document(file_path)
    if content.startswith("Error:"):
        return content

    if not content:
        logging.warning(f"Document is empty or could not be read: {file_path}")
        return "Error: Document is empty or could not be read."

    prompt = f"Summarize the following in ~{summary_length} words:\n\n{content}"

    summary = summarize_text(prompt, max_tokens=summary_length + 50)
    return summary

if __name__ == '__main__':
    # This block is for simple testing, not exhaustive validation.
    pass
