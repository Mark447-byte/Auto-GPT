// Sample Sales Data for BatiStock Analytics

// Helper function to generate a date string (YYYY-MM-DD) for X days ago
const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const sampleSalesData = [
  {
    id: 'sale001',
    date: getDateDaysAgo(1), // Yesterday
    amount: 255.00,
    items: [
      { productId: 'CEM001', productName: 'Ghacem Cement 50kg', category: 'Cement', quantity: 2, unitPrice: 85.00, totalPriceForItem: 170.00 },
      { productId: 'NAL003', productName: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', quantity: 1, unitPrice: 25.00, totalPriceForItem: 25.00 },
      { productId: 'TOL001', productName: 'Claw Hammer', category: 'Tools', quantity: 1, unitPrice: 35.00, totalPriceForItem: 35.00 },
      { productId: 'BRS002', productName: 'Paint Brush Set', category: 'Paint & Finishing', quantity: 1, unitPrice: 25.00, totalPriceForItem: 25.00 }, // Adjusted price for consistency
    ],
    customerName: 'John Doe',
    salesPersonId: 'sales01',
  },
  {
    id: 'sale002',
    date: getDateDaysAgo(1), // Yesterday
    amount: 120.00,
    items: [
      { productId: 'PNT011', productName: 'Azar Paint White (Gallon)', category: 'Paint & Finishing', quantity: 1, unitPrice: 120.00, totalPriceForItem: 120.00 },
    ],
    customerName: 'Jane Smith',
    salesPersonId: 'sales02',
  },
  {
    id: 'sale003',
    date: getDateDaysAgo(2), // Two days ago
    amount: 700.00,
    items: [
      { productId: 'SND001', productName: 'River Sand (Per Trip)', category: 'Cement', quantity: 2, unitPrice: 350.00, totalPriceForItem: 700.00 },
    ],
    salesPersonId: 'sales01',
  },
  {
    id: 'sale004',
    date: getDateDaysAgo(3),
    amount: 105.00,
    items: [
      { productId: 'TIL002', productName: 'Floor Tiles Ceramic (sqm)', category: 'Paint & Finishing', quantity: 1, unitPrice: 70.00, totalPriceForItem: 70.00 },
      { productId: 'TOL001', productName: 'Claw Hammer', category: 'Tools', quantity: 1, unitPrice: 35.00, totalPriceForItem: 35.00 },
    ],
    customerName: 'Alice Green',
    salesPersonId: 'sales02',
  },
  {
    id: 'sale005',
    date: getDateDaysAgo(5),
    amount: 340.00,
    items: [
      { productId: 'CEM001', productName: 'Ghacem Cement 50kg', category: 'Cement', quantity: 4, unitPrice: 85.00, totalPriceForItem: 340.00 },
    ],
    salesPersonId: 'sales01',
  },
  {
    id: 'sale006',
    date: getDateDaysAgo(7), // One week ago
    amount: 90.00,
    items: [
      { productId: 'PIP004', productName: 'PVC Pipe 4-inch (Length)', category: 'Pipes & Fittings', quantity: 2, unitPrice: 45.00, totalPriceForItem: 90.00 },
    ],
    customerName: 'Bob White',
    salesPersonId: 'sales01',
  },
  {
    id: 'sale007',
    date: getDateDaysAgo(10),
    amount: 240.00,
    items: [
      { productId: 'PNT011', productName: 'Azar Paint White (Gallon)', category: 'Paint & Finishing', quantity: 2, unitPrice: 120.00, totalPriceForItem: 240.00 },
    ],
    salesPersonId: 'sales02',
  },
  {
    id: 'sale008',
    date: getDateDaysAgo(15),
    amount: 180.00,
    items: [
      { productId: 'WRM001', productName: 'Wire Mesh Roll (25m)', category: 'Nails & Fasteners', quantity: 1, unitPrice: 180.00, totalPriceForItem: 180.00 },
    ],
    customerName: 'Chris Black',
    salesPersonId: 'sales01',
  },
  {
    id: 'sale009',
    date: getDateDaysAgo(20),
    amount: 170.00,
    items: [
      { productId: 'CEM001', productName: 'Ghacem Cement 50kg', category: 'Cement', quantity: 2, unitPrice: 85.00, totalPriceForItem: 170.00 },
    ],
    salesPersonId: 'sales02',
  },
  {
    id: 'sale010',
    date: getDateDaysAgo(25),
    amount: 75.00,
    items: [
      { productId: 'NAL003', productName: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', quantity: 3, unitPrice: 25.00, totalPriceForItem: 75.00 },
    ],
    customerName: 'Diana Prince',
    salesPersonId: 'sales01',
  },
  {
    id: 'sale011',
    date: getDateDaysAgo(30), // One month ago
    amount: 120.00,
    items: [
      { productId: 'TOL005', productName: 'Pointed Shovel (Heavy Duty)', category: 'Tools', quantity: 2, unitPrice: 60.00, totalPriceForItem: 120.00 },
    ],
    salesPersonId: 'sales02',
  },
  {
    id: 'sale012',
    date: getDateDaysAgo(32),
    amount: 45.00,
    items: [
      { productId: 'TAP001', productName: 'Water Tap Chrome', category: 'Pipes & Fittings', quantity: 1, unitPrice: 28.00, totalPriceForItem: 28.00 }, // Price mismatch, fixed
      { productId: 'BOL001', productName: 'Bolts & Nuts M12 (Pack)', category: 'Nails & Fasteners', quantity: 1, unitPrice: 15.00, totalPriceForItem: 15.00 }, // Price mismatch, fixed
      // Total should be 43, corrected to 43 in amount.
    ],
    amount: 43.00, // Corrected total
    customerName: 'Eva Brown',
    salesPersonId: 'sales01',
  },
   {
    id: 'sale013',
    date: getDateDaysAgo(2), // Match another sale on this day for aggregation testing
    amount: 170.00,
    items: [
      { productId: 'CEM001', productName: 'Ghacem Cement 50kg', category: 'Cement', quantity: 2, unitPrice: 85.00, totalPriceForItem: 170.00 },
    ],
    salesPersonId: 'sales01',
  },
  {
    id: 'sale014',
    date: getDateDaysAgo(5), // Match another sale on this day
    amount: 50.00,
    items: [
      { productId: 'NAL003', productName: 'Iron Nails 3-inch (Box)', category: 'Nails & Fasteners', quantity: 2, unitPrice: 25.00, totalPriceForItem: 50.00 },
    ],
    salesPersonId: 'sales02',
  },
  {
    id: 'sale015',
    date: getDateDaysAgo(40), // Older sale
    amount: 250.00,
    items: [
      { productId: 'PNT011', productName: 'Azar Paint White (Gallon)', category: 'Paint & Finishing', quantity: 2, unitPrice: 120.00, totalPriceForItem: 240.00 }, // price mismatch fixed
      { productId: 'BRS002', productName: 'Paint Brush Set', category: 'Paint & Finishing', quantity: 1, unitPrice: 25.00, totalPriceForItem: 25.00 }, // price mismatch fixed
    ],
     amount: 265.00, // Corrected total
    salesPersonId: 'sales01',
  }
];

// To ensure product details are consistent with a master product list if we had one:
// We can use the product list from SalesPosPage as a reference for categories and names.
// For this simulation, the categories and names in sampleSalesData items are manually set.
// It's important that `category` and `productName` in `items` are consistent for aggregation.
export default sampleSalesData;
