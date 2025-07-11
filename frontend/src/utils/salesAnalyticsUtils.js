// salesAnalyticsUtils.js

/**
 * Helper to check if a sale date is within a given range.
 * @param {string} saleDate - Sale date in 'YYYY-MM-DD' format.
 * @param {{startDate: string, endDate: string} | null} dateRange - Optional date range.
 * @returns {boolean}
 */
const isWithinDateRange = (saleDate, dateRange) => {
  if (!dateRange) return true; // No range means include all
  const { startDate, endDate } = dateRange;
  const sDate = new Date(saleDate);
  if (startDate && sDate < new Date(startDate)) return false;
  if (endDate) {
    // Add 1 day to endDate to make it inclusive of the end day
    const eDate = new Date(endDate);
    eDate.setDate(eDate.getDate() + 1);
    if (sDate >= eDate) return false;
  }
  return true;
};


/**
 * Aggregates sales data over time (daily, weekly, monthly).
 * @param {Array<Object>} sales - Array of sale objects.
 * @param {'daily' | 'weekly' | 'monthly'} periodType - Aggregation period.
 * @param {{startDate: string, endDate: string} | null} dateRange - Optional date range to filter sales.
 * @returns {{labels: Array<string>, data: Array<number>}}
 */
export const getSalesOverTime = (sales, periodType = 'daily', dateRange = null) => {
  const filteredSales = sales.filter(sale => isWithinDateRange(sale.date, dateRange));
  const aggregatedSales = {};

  filteredSales.forEach(sale => {
    const date = new Date(sale.date);
    let key;

    switch (periodType) {
      case 'weekly':
        // Group by the start of the week (e.g., Sunday)
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
        key = firstDayOfWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        break;
      case 'daily':
      default:
        key = sale.date; // YYYY-MM-DD
        break;
    }

    if (!aggregatedSales[key]) {
      aggregatedSales[key] = 0;
    }
    aggregatedSales[key] += sale.amount;
  });

  // Sort keys (dates/periods) for chronological order
  const sortedKeys = Object.keys(aggregatedSales).sort();

  const labels = sortedKeys;
  const data = sortedKeys.map(key => parseFloat(aggregatedSales[key].toFixed(2)));

  return { labels, data };
};


/**
 * Gets top N selling products by quantity or revenue.
 * @param {Array<Object>} sales - Array of sale objects.
 * @param {number} count - Number of top products to return.
 * @param {'quantity' | 'revenue'} by - Criterion for "top selling".
 * @param {{startDate: string, endDate: string} | null} dateRange - Optional date range.
 * @returns {{labels: Array<string>, data: Array<number>}}
 */
export const getTopSellingProducts = (sales, count = 5, by = 'revenue', dateRange = null) => {
  const filteredSales = sales.filter(sale => isWithinDateRange(sale.date, dateRange));
  const productSales = {}; // { productId: { name, totalQuantity, totalRevenue } }

  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          name: item.productName,
          totalQuantity: 0,
          totalRevenue: 0
        };
      }
      productSales[item.productId].totalQuantity += item.quantity;
      productSales[item.productId].totalRevenue += item.totalPriceForItem;
    });
  });

  const sortedProducts = Object.values(productSales).sort((a, b) => {
    if (by === 'quantity') {
      return b.totalQuantity - a.totalQuantity;
    }
    return b.totalRevenue - a.totalRevenue; // Default to revenue
  });

  const topN = sortedProducts.slice(0, count);
  const labels = topN.map(p => p.name);
  const data = topN.map(p => by === 'quantity' ? p.totalQuantity : parseFloat(p.totalRevenue.toFixed(2)));

  return { labels, data };
};


/**
 * Aggregates sales data by product category.
 * @param {Array<Object>} sales - Array of sale objects.
 * @param {{startDate: string, endDate: string} | null} dateRange - Optional date range.
 * @returns {{labels: Array<string>, data: Array<number>}}
 */
export const getSalesByCategory = (sales, dateRange = null) => {
  const filteredSales = sales.filter(sale => isWithinDateRange(sale.date, dateRange));
  const categorySales = {}; // { categoryName: totalAmount }

  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!categorySales[category]) {
        categorySales[category] = 0;
      }
      categorySales[category] += item.totalPriceForItem;
    });
  });

  const labels = Object.keys(categorySales);
  const data = labels.map(cat => parseFloat(categorySales[cat].toFixed(2)));

  return { labels, data };
};

// Example of how to get a date range for "Last N Days"
export const getDateRangeForLastNDays = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days - 1)); // -1 because we want to include today
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    };
};
