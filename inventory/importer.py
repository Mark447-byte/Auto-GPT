from .parsers import parse_csv, parse_docx, parse_pdf
from .validators import validate_row
from .database import insert_product, create_tables
from typing import List

def import_inventory(file_path: str):
    """
    Imports inventory from a file, validates the data,
    stores valid entries in the database, and logs errors.
    """
    create_tables()

    if file_path.endswith('.csv'):
        parser = parse_csv
    elif file_path.endswith('.docx'):
        parser = parse_docx
    elif file_path.endswith('.pdf'):
        parser = parse_pdf
    else:
        raise ValueError("Unsupported file type")

    errors: List[dict] = []
    products_added = 0

    for i, row in enumerate(parser(file_path)):
        product = validate_row(row)
        if product:
            insert_product(product)
            products_added += 1
        else:
            errors.append({"row": i + 1, "data": row, "error": "Invalid or missing data"})

    with open("import_errors.log", "w") as f:
        for error in errors:
            f.write(f"Row {error['row']} skipped: {error['error']}. Data: {error['data']}\n")

    return {"products_added": products_added, "errors": len(errors)}
