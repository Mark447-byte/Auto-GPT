import React, { useState, useEffect, useCallback } from 'react';
import ProductSearch from '../../components/sales/ProductSearch';
import CategoryButtons from '../../components/sales/CategoryButtons';
import ProductGrid from '../../components/sales/ProductGrid';
import CartSummary from '../../components/sales/CartSummary';
import CustomerQuickAdd from '../../components/sales/CustomerQuickAdd';
import PaymentOptions from '../../components/sales/PaymentOptions';
import OfflineIndicator from '../../components/sales/OfflineIndicator';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, bulkPutProducts, getAllProducts as dbGetAllProducts, syncOfflineSales } from '../../db'; // Import syncOfflineSales

// Sample Data (migrated from vanilla JS) - This will serve as fallback or initial seed if DB is empty
const initialSampleProductsFallback = [
    { id: 'CEM001', name: 'Ghacem Cement 50kg', category: 'Cement', price: 85.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Cement' },
    { id: 'NAL003', name: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', price: 25.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Nails' },
    { id: 'PNT011', name: 'Azar Paint White (Gallon)', category: 'Paint & Finishing', price: 120.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Paint' },
    { id: 'TOL005', name: 'Pointed Shovel (Heavy Duty)', category: 'Tools', price: 60.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Shovel' },
    // ... include all other sample products here if desired for fallback
];


// Simulated API function (replace with actual API call later)
const fetchProductsFromAPI = async () => {
  console.log("[API SIM] Fetching products...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("[API SIM] Products fetched successfully.");
      // Return a slightly different set or updated prices to see caching work
      const apiProducts = [
        { id: 'CEM001', name: 'Ghacem Cement 50kg (API)', category: 'Cement', price: 88.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Cement' },
        { id: 'NAL003', name: 'Iron Nails 3-inch (Box) (API)', category: 'Nails & Fasteners', price: 27.50, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Nails' },
        { id: 'PNT011', name: 'Azar Paint White (Gallon) (API)', category: 'Paint & Finishing', price: 125.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Paint' },
        { id: 'TOL005', name: 'Pointed Shovel (Heavy Duty) (API)', category: 'Tools', price: 62.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Shovel' },
        { id: 'PIP004', name: 'PVC Pipe 4-inch (Length) (API)', category: 'Pipes & Fittings', price: 48.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=PVC+Pipe' },
        { id: 'TIL002', name: 'Floor Tiles Ceramic (sqm) (API)', category: 'Paint & Finishing', price: 75.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Tiles' },
        { id: 'TOL001', name: 'Claw Hammer (Wooden Handle) (API)', category: 'Tools', price: 38.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Hammer' },
        { id: 'SND001', name: 'River Sand (Per Trip) (API)', category: 'Cement', price: 360.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Sand' },
      ];
      resolve(apiProducts);
    }, 1000);
  });
};


function SalesPosPage() {
  // const [products, setProducts] = useState(initialSampleProducts); // Replaced by useLiveQuery
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
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine); // More reliable status

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Dexie useLiveQuery for products
  const productsFromDB = useLiveQuery(
    () => dbGetAllProducts(), // Use the renamed db function
    [], // Dependencies
    initialSampleProductsFallback // Fallback data if DB is empty or useLiveQuery hasn't run
  );

  const productsToDisplay = productsFromDB || initialSampleProductsFallback;


  useEffect(() => {
    const updateOnlineStatus = () => {
      const newStatus = navigator.onLine;
      console.log('Network status changed to:', newStatus ? 'Online' : 'Offline');
      setNetworkStatus(newStatus);
      if (newStatus) {
        console.log("App is online, attempting to sync offline sales...");
        syncOfflineSales().then(results => { // syncOfflineSales is imported from db.js
          if (results.attempted > 0) {
            alert(`Sync attempt: ${results.successful} successful, ${results.failed} failed.`);
          }
        });
      }
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial fetch and cache / Attempt sync on load if online
    if (navigator.onLine) {
      fetchProductsFromAPI().then(apiProducts => {
        if (apiProducts && apiProducts.length > 0) {
          console.log("Caching API products to IndexedDB");
          bulkPutProducts(apiProducts)
            .catch(err => console.error("Error caching products:", err));
        }
      }).catch(err => console.error("API fetch error:", err));

      // Attempt sync on initial load if online
      console.log("App initially online, attempting to sync offline sales...");
      syncOfflineSales().then(results => {
        if (results.attempted > 0) {
            // Maybe a less intrusive notification than alert here for initial load
            console.log(`Initial sync attempt: ${results.successful} successful, ${results.failed} failed.`);
        }
      });

    } else {
        console.log("Offline: Skipping initial API product fetch and sync.");
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []); // Run once on mount to set up listeners and initial fetch


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

  const handleGenerateReceipt = async () => { // Made async
    if (cart.length === 0) {
        alert("Cannot generate receipt for an empty cart.");
        return;
    }

    const saleDataToSave = {
        timestamp: new Date().toISOString(),
        items: cart, // Store a copy of the cart items
        customerName: customerName,
        customerContact: customerContact,
        paymentMethod: selectedPaymentMethod, // Store selected payment method
        subtotal: subtotal,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        status: networkStatus ? 'synced_immediately' : 'pending_sync' // Initial status
    };

    if (networkStatus) {
        console.log("[ONLINE] Simulating direct sale submission to backend:", saleDataToSave);
        // In a real app, this would be:
        // try {
        //   const response = await api.post('/sales', saleDataToSave);
        //   // Handle successful online submission
        //   alert("Sale submitted successfully online!");
        // } catch (error) {
        //   console.error("Failed to submit sale online, saving locally:", error);
        //   saleDataToSave.status = 'pending_sync_after_online_fail'; // Or similar
        //   await db.addOfflineSale(saleDataToSave); // Use the correct function from db.js
        //   alert("Online submission failed. Sale saved locally and will sync later.");
        // }
        alert(`ONLINE: Receipt Generated!\nTotal: GHS ${totalAmount.toFixed(2)}\nCustomer: ${customerName || 'N/A'}`);
        console.log("--- ONLINE RECEIPT (Simulated) ---", saleDataToSave);

    } else {
        console.log("[OFFLINE] Saving sale to IndexedDB:", saleDataToSave);
        try {
            await db.addOfflineSale(saleDataToSave); // Using the imported addOfflineSale from db.js
            alert("OFFLINE: Sale saved locally. Will sync when online.");
            console.log("--- OFFLINE SALE SAVED (Simulated) ---", saleDataToSave);
        } catch (error) {
            console.error("Failed to save sale offline to IndexedDB:", error);
            alert("Error: Could not save sale locally. Please check console.");
            // Don't clear cart if saving failed, so user doesn't lose data
            return;
        }
    }

    // Clear cart, customer fields, and payment selection after successful processing (online or offline save)
    setCart([]);
    setCustomerName('');
    setCustomerContact('');
    setSelectedPaymentMethod(null);
    // Totals will auto-update due to useEffect on cart change
  };

  const toggleOfflineStatus = () => setNetworkStatus(prev => !prev); // For demo button


  // This will be refined when ProductGrid and CategoryButtons components are built
  const displayedProducts = productsToDisplay.filter(p =>
    (currentCategory === 'All Products' || p.category === currentCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['All Products', ...new Set(productsToDisplay.map(p => p.category))];


  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-md w-full p-3 flex justify-between items-center print:hidden">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/100x40?text=BatiStock" alt="BatiStock Logo" className="h-8 mr-3" />
          <span className="text-xl font-semibold text-gray-700">POS Mode</span>
        </div>
        <div className="flex items-center space-x-4">
          <OfflineIndicator isOnline={networkStatus} onToggle={toggleOfflineStatus} /> {/* Use networkStatus */}
          <span className="text-sm text-gray-700">User: SalesRep01</span> {/* TODO: Replace with actual username from AuthContext */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Logout
          </button>
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
