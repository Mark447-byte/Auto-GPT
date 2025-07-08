import Dexie from 'dexie';

export const db = new Dexie('BatiStockDB');

db.version(1).stores({
  products: '++id, &productId, name, category, price', // productId is unique, internal id is auto-incrementing primary key
  offlineSales: '++id, timestamp, status', // auto-incrementing primary key, status for sync
  // Future stores can be added here:
  // projects: '&id, name, status',
  // customers: '&id, name, contact',
  // appSettings: 'key, value' // for general app settings
});

// Pre-populate products (example, normally synced from backend)
// This is more for seeding/testing if no backend sync is in place yet for products.
// In a real scenario, products would be populated from an API call and then cached.
/*
db.on('populate', async () => {
  const initialSampleProducts = [
    { productId: 'CEM001', name: 'Ghacem Cement 50kg', category: 'Cement', price: 85.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Cement' },
    { productId: 'NAL003', name: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', price: 25.00, image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Nails' },
    // ... more products from initialSampleProducts in SalesPosPage
  ];

  // Use transaction to ensure atomicity
  await db.transaction('rw', db.products, async () => {
    for (const product of initialSampleProducts) {
      const existing = await db.products.get({ productId: product.productId });
      if (!existing) {
        await db.products.add(product);
      } else {
        // Optionally update existing product if details differ
        // await db.products.update(existing.id, product);
      }
    }
  });
  console.log("Sample products populated if database was empty.");
});
*/

// CRUD operation examples (can be expanded into service functions)

// Products
export const getAllProducts = async () => {
  return await db.products.toArray();
};

export const bulkPutProducts = async (productsData) => {
  // This will add or update products based on the 'productId' key
  // Ensure your productsData items have a unique 'productId' field that matches the schema
  return await db.products.bulkPut(productsData.map(p => ({...p, productId: p.id }) )); // Assuming p.id is the unique external ID
};

export const getProductById = async (productId) => {
  return await db.products.get({ productId });
};

// Offline Sales
export const addOfflineSale = async (saleData) => {
  // saleData should include: timestamp, items, customerName, customerContact, totalAmount, status
  return await db.offlineSales.add(saleData);
};

export const getPendingOfflineSales = async () => {
  return await db.offlineSales.where('status').equals('pending_sync').toArray();
};

export const updateOfflineSaleStatus = async (id, newStatus) => {
  return await db.offlineSales.update(id, { status: newStatus });
};

export const deleteOfflineSale = async (id) => {
  return await db.offlineSales.delete(id);
};


// Open the database. This is important for the populate event to trigger if needed.
db.open().catch(err => {
  console.error(`Failed to open db: ${err.stack || err}`);
});

// --- Synchronization Logic Stub ---
export const syncOfflineSales = async () => {
  if (!navigator.onLine) {
    console.log("[Sync Stub] App is offline. Sync deferred.");
    return { attempted: 0, successful: 0, failed: 0 };
  }

  const pendingSales = await getPendingOfflineSales();
  if (pendingSales.length === 0) {
    console.log("[Sync Stub] No pending sales to sync.");
    return { attempted: 0, successful: 0, failed: 0 };
  }

  console.log(`[Sync Stub] Found ${pendingSales.length} sales to sync.`);
  let successfulSyncs = 0;
  let failedSyncs = 0;

  for (const sale of pendingSales) {
    console.log(`[Sync Stub] Attempting to sync sale ID: ${sale.id}, Timestamp: ${sale.timestamp}`);
    try {
      // Simulate API call to backend to submit the sale
      // const response = await fetch('/api/sales', { // Replace with actual API endpoint
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', /* Add Auth token if needed */ },
      //   body: JSON.stringify(sale) // Send the whole sale object or a transformed version
      // });

      // Simulate a successful response for some, and failure for others for testing
      const simulatedSuccess = Math.random() > 0.3; // 70% chance of success for demo

      if (simulatedSuccess /* response.ok */) {
        console.log(`[Sync Stub] Successfully synced sale ID: ${sale.id}.`);
        // Update status in IndexedDB to 'synced' or delete the record
        await updateOfflineSaleStatus(sale.id, 'synced');
        // Or: await deleteOfflineSale(sale.id);
        successfulSyncs++;
      } else {
        console.error(`[Sync Stub] Failed to sync sale ID: ${sale.id}. Status: (Simulated failure)`);
        // Optionally update status to 'sync_failed' and perhaps store error details
        await updateOfflineSaleStatus(sale.id, 'sync_failed');
        failedSyncs++;
      }
    } catch (error) {
      console.error(`[Sync Stub] Error syncing sale ID: ${sale.id}:`, error);
      // Optionally update status to 'sync_failed'
      await updateOfflineSaleStatus(sale.id, 'sync_failed_exception');
      failedSyncs++;
    }
  }
  console.log(`[Sync Stub] Sync process completed. Successful: ${successfulSyncs}, Failed: ${failedSyncs}`);
  return { attempted: pendingSales.length, successful: successfulSyncs, failed: failedSyncs };
};


export default db;
