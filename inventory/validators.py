from pydantic import BaseModel, validator, ValidationError

class Product(BaseModel):
    category: str
    product: str
    price: float
    unit: str
    low_stock_threshold: int = 5
    initial_stock: int = 0

    @validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('price must be positive')
        return v

def validate_row(row: list) -> Product | None:
    """Validates a single row of data."""
    if len(row) < 4:
        return None
    try:
        product_data = {
            "category": row[0],
            "product": row[1],
            "price": float(row[2]),
            "unit": row[3],
        }
        return Product(**product_data)
    except (ValueError, ValidationError):
        return None
