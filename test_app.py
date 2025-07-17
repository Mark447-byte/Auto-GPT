import unittest
import os
from app import app, session, ReceiptSettings, Sale

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        os.makedirs('static/uploads', exist_ok=True)
        os.makedirs('static/receipts', exist_ok=True)
        os.makedirs('static/barcodes', exist_ok=True)

    def test_admin_panel(self):
        response = self.app.get('/admin')
        self.assertEqual(response.status_code, 200)

        from io import BytesIO
        response = self.app.post('/admin', data={
            'company_name': 'Test Company',
            'whatsapp_number': '1234567890',
            'header_image': (BytesIO(b''), 'header.jpg'),
            'footer_image': (BytesIO(b''), 'footer.jpg')
        }, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 302)

        settings = session.query(ReceiptSettings).first()
        self.assertIsNotNone(settings)
        self.assertEqual(settings.company_name, 'Test Company')
        self.assertEqual(settings.whatsapp_number, '1234567890')

    def test_sales_panel(self):
        response = self.app.get('/sales')
        self.assertEqual(response.status_code, 200)

        response = self.app.post('/sales', data={
            'product_name': 'Test Product',
            'quantity': '1',
            'unit_price': '10.00'
        })
        self.assertEqual(response.status_code, 302)

        sale = session.query(Sale).first()
        self.assertIsNotNone(sale)
        self.assertEqual(sale.products[0]['name'], 'Test Product')
        self.assertEqual(sale.total_amount, 10.00)
        self.assertTrue(os.path.exists(sale.receipt_url))
        self.assertTrue(os.path.exists(sale.barcode_url))

    def tearDown(self):
        session.query(ReceiptSettings).delete()
        session.query(Sale).delete()
        session.commit()

if __name__ == '__main__':
    unittest.main()
