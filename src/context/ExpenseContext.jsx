import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { parseCSV, normalizeTransaction } from '../utils/csvHelpers';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('expense_transactions');
        return saved ? JSON.parse(saved) : [];
    });

    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('expense_budgets');
        return saved ? JSON.parse(saved) : {};
    });

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: 'All',
        search: '',
    });

    useEffect(() => {
        localStorage.setItem('expense_transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('expense_budgets', JSON.stringify(budgets));
    }, [budgets]);

    const addTransactions = (newTransactions) => {
        setTransactions(prev => [...prev, ...newTransactions]);
    };

    const clearTransactions = () => {
        setTransactions([]);
    };

    const updateBudget = (category, amount) => {
        setBudgets(prev => ({
            ...prev,
            [category]: parseFloat(amount)
        }));
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchCategory = filters.category === 'All' || t.category === filters.category;
            const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());

            let matchDate = true;
            if (filters.startDate) {
                matchDate = matchDate && new Date(t.date) >= new Date(filters.startDate);
            }
            if (filters.endDate) {
                matchDate = matchDate && new Date(t.date) <= new Date(filters.endDate);
            }

            return matchCategory && matchSearch && matchDate;
        });
    }, [transactions, filters]);

    const categories = useMemo(() => {
        const cats = new Set(transactions.map(t => t.category));
        return ['All', ...Array.from(cats)];
    }, [transactions]);

    const value = {
        transactions,
        filteredTransactions,
        budgets,
        filters,
        setFilters,
        addTransactions,
        clearTransactions,
        updateBudget,
        categories
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
};
