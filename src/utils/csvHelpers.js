import Papa from 'papaparse';

export const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Basic validation could go here
                if (results.errors.length) {
                    console.warn('CSV Parse Errors:', results.errors);
                }
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Helper to normalize data format
export const normalizeTransaction = (raw) => {
    // Try to match columns case-insensitively or via common names if needed.
    // For now, assuming strict 'Date', 'Category', 'Description', 'Amount' as per requirements.
    const amount = parseFloat(raw.Amount);
    return {
        id: crypto.randomUUID(),
        date: raw.Date ? new Date(raw.Date) : new Date(),
        category: raw.Category || 'Uncategorized',
        description: raw.Description || '',
        amount: isNaN(amount) ? 0 : amount,
    };
};
