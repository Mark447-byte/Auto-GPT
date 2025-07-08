import React, { useState, useEffect, useCallback } from 'react';
import ProductSearch from '../../components/sales/ProductSearch';
import CategoryButtons from '../../components/sales/CategoryButtons';
import ProductGrid from '../../components/sales/ProductGrid';
import CartSummary from '../../components/sales/CartSummary';
import CustomerQuickAdd from '../../components/sales/CustomerQuickAdd';
import PaymentOptions from '../../components/sales/PaymentOptions';
import OfflineIndicator from '../../components/sales/OfflineIndicator'; // Import new component

// Sample Data (migrated from vanilla JS)
const initialSampleProducts = [
    { id: 'CEM001', name: 'Ghacem Cement 50kg', category: 'Cement', price: 85.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Cement' },
    { id: 'NAL003', name: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', price: 25.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Nails' },
    { id: 'PNT011', name: 'Azar Paint White (Gallon)', category: 'Paint & Finishing', price: 120.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Paint' },
    { id: 'TOL005', name: 'Pointed Shovel (Heavy Duty)', category: 'Tools', price: 60.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Shovel' },
    { id: 'PIP004', name: 'PVC Pipe 4-inch (Length)', category: 'Pipes & Fittings', price: 45.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=PVC+Pipe' },
    { id: 'TIL002', name: 'Floor Tiles Ceramic (sqm)', category: 'Paint & Finishing', price: 70.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Tiles' },
    { id: 'TOL001', name: 'Claw Hammer (Wooden Handle)', category: 'Tools', price: 35.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Hammer' },
    { id: 'SND001', name: 'River Sand (Per Trip)', category: 'Cement', price: 350.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Sand' },
    { id: 'WRM001', name: 'Wire Mesh Roll (25m)', category: 'Nails & Fasteners', price: 180.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Wire+Mesh' },
    { id: 'BRS002', name: 'Paint Brush Set (5pcs)', category: 'Paint & Finishing', price: 40.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Brushes' },
    { id: 'TAP001', name: 'Water Tap Chrome', category: 'Pipes & Fittings', price: 28.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Tap' },
    { id: 'BOL001', name: 'Bolts & Nuts M12 (Pack)', category: 'Nails & Fasteners', price: 15.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Bolts' }
];

function SalesPosPage() {
  const [products, setProducts] = useState(initialSampleProducts);
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isOnline, setIsOnline] = useState(true); // Default to online
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const TAX_RATE = 0.025; // NHIL 2.5%

  // --- Cart Logic ---
  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    setCart(prevCart => {
      if (quantity <= 0) { // Remove if quantity is 0 or less
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Calculate totals whenever cart changes
  useEffect(() => {
    let currentSubtotal = 0;
    cart.forEach(item => {
      currentSubtotal += item.price * item.quantity;
    });
    const currentTaxAmount = currentSubtotal * TAX_RATE;
    const currentTotalAmount = currentSubtotal + currentTaxAmount; // Discount not included yet

    setSubtotal(currentSubtotal);
    setTaxAmount(currentTaxAmount);
    setTotalAmount(currentTotalAmount);
  }, [cart]);


  // Other handlers
  const handlePaymentSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    console.log("Payment method selected:", methodId);
  };

  const handleGenerateReceipt = () => {
    if (cart.length === 0) {
        alert("Cannot generate receipt for an empty cart.");
        return;
    }

    let receiptMessage = `Receipt Generated!\n--------------------\nTotal: GHS ${totalAmount.toFixed(2)}`;
    if (customerName) receiptMessage += `\nCustomer: ${customerName}`;
    if (customerContact) receiptMessage += `\nContact: ${customerContact}`;
    if (selectedPaymentMethod) receiptMessage += `\nPayment Method: ${selectedPaymentMethod}`;

    receiptMessage += "\n\nItems:\n";
    cart.forEach(item => {
        receiptMessage += `- ${item.name} (x${item.quantity}) @ GHS ${item.price.toFixed(2)} = GHS ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    receiptMessage += `--------------------\nSubtotal: GHS ${subtotal.toFixed(2)}\nTax: GHS ${taxAmount.toFixed(2)}\n--------------------\nThank you!`;

    alert(receiptMessage);
    console.log("--- RECEIPT ---");
    console.log(receiptMessage.replace(/\n/g, '\n'));
    console.log("--- END RECEIPT ---");

    // Clear cart, customer fields, and payment selection
    setCart([]);
    setCustomerName('');
    setCustomerContact('');
    setSelectedPaymentMethod(null);
    // Totals will auto-update due to useEffect on cart change
  };
  const toggleOfflineStatus = () => setIsOnline(prev => !prev);


  // This will be refined when ProductGrid and CategoryButtons components are built
  const displayedProducts = products.filter(p =>
    (currentCategory === 'All Products' || p.category === currentCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['All Products', ...new Set(initialSampleProducts.map(p => p.category))];


  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-md w-full p-3 flex justify-between items-center print:hidden">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/100x40?text=BatiStock" alt="BatiStock Logo" className="h-8 mr-3" />
          <span className="text-xl font-semibold text-gray-700">POS Mode</span>
        </div>
        <div className="flex items-center space-x-4">
          <OfflineIndicator isOnline={isOnline} onToggle={toggleOfflineStatus} />
          <span className="text-sm text-gray-700">User: SalesRep01</span>
          {/* In React, use Link from react-router-dom for navigation */}
          {/* For now, a simple href or a button that uses useNavigate */}
          <a href="/select-role" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Logout</a>
        </div>
      </header>

      {/* Main POS Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Product Selection */}
        <aside id="product-selection-area-react" className="w-3/5 bg-white p-5 overflow-y-auto border-r border-gray-300 print:hidden">
          <ProductSearch searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
          <CategoryButtons
            categories={categories}
            currentCategory={currentCategory}
            onCategorySelect={setCurrentCategory}
          />
          <ProductGrid products={displayedProducts} onAddToCart={handleAddToCart} />
        </aside>

        {/* Right Column: Cart Summary, Customer, Payment */}
        <main id="cart-area-react" className="w-2/5 bg-gray-50 p-5 flex flex-col overflow-y-auto">
          <CartSummary
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            subtotal={subtotal}
            taxAmount={taxAmount}
            totalAmount={totalAmount}
          />

          <CustomerQuickAdd
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            customerContact={customerContact}
            onCustomerContactChange={setCustomerContact}
          />

          <PaymentOptions
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentSelect={handlePaymentSelect}
            onGenerateReceipt={handleGenerateReceipt}
            cartIsEmpty={cart.length === 0}
          />
        </main>
      </div>
    </div>
  );
}

export default SalesPosPage;
