import sqlite3
from .validators import Product

def get_db_connection():
    """Establishes a connection to the database."""
    conn = sqlite3.connect('inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    """Creates the necessary tables in the database."""
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            unit TEXT NOT NULL,
            low_stock_threshold INTEGER NOT NULL,
            stock INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories (id)
        )
    ''')
    conn.commit()
    conn.close()

def get_or_create_category(conn: sqlite3.Connection, category_name: str) -> int:
    """Gets the ID of a category, creating it if it doesn't exist."""
    c = conn.cursor()
    c.execute("SELECT id FROM categories WHERE name = ?", (category_name,))
    category = c.fetchone()
    if category:
        return category['id']
    else:
        c.execute("INSERT INTO categories (name) VALUES (?)", (category_name,))
        return c.lastrowid

def insert_product(product: Product):
    """Inserts a product into the database."""
    conn = get_db_connection()
    category_id = get_or_create_category(conn, product.category)
    c = conn.cursor()
    c.execute(
        "INSERT INTO products (name, price, unit, low_stock_threshold, stock, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        (product.product, product.price, product.unit, product.low_stock_threshold, product.initial_stock, category_id)
    )
    conn.commit()
    conn.close()
