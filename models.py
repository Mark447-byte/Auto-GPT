import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class ReceiptSettings(Base):
    __tablename__ = 'receipt_settings'

    id = Column(Integer, primary_key=True)
    company_name = Column(String)
    whatsapp_number = Column(String)
    header_image_url = Column(String)
    footer_image_url = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Sale(Base):
    __tablename__ = 'sales'

    id = Column(Integer, primary_key=True)
    sale_number = Column(String, unique=True, nullable=False)
    products = Column(JSON)
    total_amount = Column(Float)
    created_by = Column(String) # Assuming created_by is a user ID string
    receipt_url = Column(String)
    barcode_url = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

engine = create_engine('sqlite:///sales.db')
Base.metadata.create_all(engine)

DBSession = sessionmaker(bind=engine)
session = DBSession()
