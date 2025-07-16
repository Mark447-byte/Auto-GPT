import pandas as pd
import pdfplumber
from docx import Document
from typing import Iterator, List

def parse_csv(file_path: str) -> Iterator[List[str]]:
    """Parses a CSV file and yields rows."""
    return pd.read_csv(file_path).values

def parse_docx(file_path: str) -> Iterator[List[str]]:
    """Parses a DOCX file and yields rows."""
    doc = Document(file_path)
    for table in doc.tables:
        for row in table.rows:
            yield [cell.text for cell in row.cells]

def parse_pdf(file_path: str) -> Iterator[List[str]]:
    """Parses a PDF file and yields rows."""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                for row in table:
                    yield row
