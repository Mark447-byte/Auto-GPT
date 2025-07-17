from flask import Flask, render_template, request, redirect, url_for
from models import ReceiptSettings, session
import os
import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        company_name = request.form['company_name']
        whatsapp_number = request.form['whatsapp_number']

        header_image = request.files['header_image']
        footer_image = request.files['footer_image']

        header_image_url = ''
        footer_image_url = ''

        if header_image:
            header_image_path = os.path.join(app.config['UPLOAD_FOLDER'], header_image.filename)
            header_image.save(header_image_path)
            header_image_url = header_image_path

        if footer_image:
            footer_image_path = os.path.join(app.config['UPLOAD_FOLDER'], footer_image.filename)
            footer_image.save(footer_image_path)
            footer_image_url = footer_image_path

        settings = ReceiptSettings(
            company_name=company_name,
            whatsapp_number=whatsapp_number,
            header_image_url=header_image_url,
            footer_image_url=footer_image_url
        )
        session.add(settings)
        session.commit()
        return redirect(url_for('admin'))

    settings = session.query(ReceiptSettings).first()
    return render_template('admin.html', settings=settings)

from weasyprint import HTML
from models import Sale
import uuid
import qrcode

@app.route('/sales', methods=['GET', 'POST'])
def sales():
    if request.method == 'POST':
        products = []
        total_amount = 0
        for i in range(len(request.form.getlist('product_name'))):
            product_name = request.form.getlist('product_name')[i]
            quantity = int(request.form.getlist('quantity')[i])
            unit_price = float(request.form.getlist('unit_price')[i])
            price = quantity * unit_price
            products.append({
                'name': product_name,
                'quantity': quantity,
                'unit_price': unit_price,
                'price': price
            })
            total_amount += price

        sale_number = f"SALE-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}"

        new_sale = Sale(
            sale_number=sale_number,
            products=products,
            total_amount=total_amount,
            created_by="user" # Replace with actual user
        )
        session.add(new_sale)
        session.commit()

        # Generate PDF
        settings = session.query(ReceiptSettings).first()
        html = render_template('receipt.html', sale=new_sale, settings=settings)
        pdf = HTML(string=html).write_pdf()

        # Save PDF
        receipt_filename = f"{sale_number}.pdf"
        receipt_path = os.path.join('static/receipts', receipt_filename)
        with open(receipt_path, 'wb') as f:
            f.write(pdf)

        new_sale.receipt_url = receipt_path

        # Generate QR Code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f"https://yourdomain.com/receipt?ref={sale_number}") # Replace with your domain
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        barcode_filename = f"{sale_number}_qr.png"
        barcode_path = os.path.join('static/barcodes', barcode_filename)
        img.save(barcode_path)

        new_sale.barcode_url = barcode_path
        session.commit()

        return redirect(url_for('sales'))

    sales = session.query(Sale).all()
    return render_template('sales.html', sales=sales)

@app.route('/receipt')
def receipt():
    sale_number = request.args.get('ref')
    settings = session.query(ReceiptSettings).first()
    if not settings or not settings.whatsapp_number:
        return "WhatsApp number not configured."

    receipt_url = url_for('static', filename=f"receipts/{sale_number}.pdf", _external=True)
    message = f"Hello 👋, here’s your receipt for Sale #{sale_number}.\n🧾 Download it here: {receipt_url}"
    whatsapp_url = f"https://wa.me/{settings.whatsapp_number}?text={message}"

    return redirect(whatsapp_url)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs('static/receipts', exist_ok=True)
    os.makedirs('static/barcodes', exist_ok=True)
    app.run(debug=True)
