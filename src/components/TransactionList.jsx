import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/csvHelpers';

export const TransactionList = ({ limit }) => {
    const { filteredTransactions } = useExpenses();

    if (!filteredTransactions.length) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border)'
            }}>
                No transactions found matching your filters.
            </div>
        );
    }

    // Limit to recent 50 for performance if list is huge, or pagination (not implemented for simplicity)
    const displayList = limit ? filteredTransactions.slice(0, limit) : filteredTransactions.slice(0, 50);

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            overflow: 'hidden'
        }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Date</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Description</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Category</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayList.map(t => (
                            <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                    {new Date(t.date).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{t.description}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        backgroundColor: '#eff6ff',
                                        color: 'var(--primary)',
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '500'
                                    }}>
                                        {t.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    {formatCurrency(t.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredTransactions.length > 50 && (
                <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                    Showing 50 of {filteredTransactions.length} transactions
                </div>
            )}
        </div>
    );
};
