import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/csvHelpers';
import { Card } from './ui/Card';
import { CategoryPieChart } from './charts/CategoryPieChart';
import { SpendingTrendChart } from './charts/SpendingTrendChart';
import { FileUpload } from './FileUpload';
import { TransactionList } from './TransactionList';

export const Dashboard = () => {
    const { transactions, filteredTransactions } = useExpenses();

    const stats = useMemo(() => {
        const total = filteredTransactions.reduce((acc, t) => acc + t.amount, 0);
        const count = filteredTransactions.length;
        const avg = count ? total / count : 0;

        // Simple mock trend calc logic: if we had previous month data separated clearly
        // For now, hardcoding 0 or just not showing trend unless we implement meaningful comparison logic
        return { total, count, avg };
    }, [filteredTransactions]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header / Actions - could be in Layout but putting page context here */}
            <div>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dashboard</h2>
                <p style={{ color: 'var(--text-muted)' }}>Overview of your financial activity</p>
            </div>

            {/* File Upload Section always visible if empty? Or just at top */}
            {!transactions.length && <FileUpload />}

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <Card
                    title="Total Spending"
                    value={formatCurrency(stats.total)}
                    icon={DollarSign}
                />
                <Card
                    title="Transactions"
                    value={stats.count}
                    icon={CreditCard}
                />
                <Card
                    title="Average Transaction"
                    value={formatCurrency(stats.avg)}
                    icon={TrendingUp}
                />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                <div style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border)'
                }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Spending Trend</h3>
                    <SpendingTrendChart />
                </div>
                <div style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border)'
                }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Categories</h3>
                    <CategoryPieChart />
                </div>
            </div>

            {/* Recent Transactions */}
            {transactions.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Transactions</h3>
                    <div style={{ overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <TransactionList limit={5} />
                    </div>
                </div>
            )}
        </div>
    );
};
