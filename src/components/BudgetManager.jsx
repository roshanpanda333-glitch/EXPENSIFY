import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/csvHelpers';

export const BudgetManager = () => {
    const { categories, budgets, updateBudget, transactions } = useExpenses();
    const [editingCategory, setEditingCategory] = useState(null);
    const [tempAmount, setTempAmount] = useState('');

    // Calculate spending per category
    const spendingByCategory = categories.reduce((acc, cat) => {
        const total = transactions
            .filter(t => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0);
        acc[cat] = total;
        return acc;
    }, {});

    const handleSave = (category) => {
        if (tempAmount) {
            updateBudget(category, tempAmount);
        }
        setEditingCategory(null);
        setTempAmount('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Budget Management</h2>
                <p style={{ color: 'var(--text-muted)' }}>Set monthly limits and track your progress</p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {categories.filter(c => c !== 'All').map(cat => {
                    const budget = budgets[cat] || 0;
                    const spent = spendingByCategory[cat] || 0;
                    const percent = budget > 0 ? (spent / budget) * 100 : 0;
                    const isOverBudget = spent > budget && budget > 0;
                    const isClose = percent > 80 && !isOverBudget;

                    return (
                        <div key={cat} style={{
                            backgroundColor: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{cat}</h3>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        Spent: {formatCurrency(spent)}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {editingCategory === cat ? (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="number"
                                                value={tempAmount}
                                                onChange={(e) => setTempAmount(e.target.value)}
                                                placeholder="Amount"
                                                autoFocus
                                                style={{
                                                    padding: '0.5rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--primary)',
                                                    width: '100px'
                                                }}
                                            />
                                            <button
                                                onClick={() => handleSave(cat)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: 'var(--primary)',
                                                    color: 'white',
                                                    borderRadius: '6px',
                                                    border: 'none',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '600', fontSize: '1rem' }}>
                                                {budget > 0 ? formatCurrency(budget) : 'No Limit'}
                                            </div>
                                            <button
                                                onClick={() => { setEditingCategory(cat); setTempAmount(budget || ''); }}
                                                style={{
                                                    fontSize: '0.75rem',
                                                    color: 'var(--primary)',
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    textDecoration: 'underline'
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {budget > 0 && (
                                <div style={{ position: 'relative', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        width: `${Math.min(percent, 100)}%`,
                                        backgroundColor: isOverBudget ? 'var(--danger)' : isClose ? 'var(--warning)' : 'var(--success)',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                            )}

                            {/* Alerts */}
                            {budget > 0 && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: '500' }}>
                                    {isOverBudget && <span style={{ color: 'var(--danger)' }}>⚠️ Over Budget by {formatCurrency(spent - budget)}</span>}
                                    {isClose && <span style={{ color: 'var(--warning)' }}>⚠️ Close to limit ({Math.round(percent)}%)</span>}
                                    {!isOverBudget && !isClose && <span style={{ color: 'var(--success)' }}>On track</span>}
                                </div>
                            )}
                        </div>
                    );
                })}

                {categories.length <= 1 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        Import transactions to see categories and set budgets.
                    </div>
                )}
            </div>
        </div>
    );
};
