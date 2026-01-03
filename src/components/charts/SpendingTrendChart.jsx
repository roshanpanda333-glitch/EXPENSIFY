import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { format } from 'date-fns';

export const SpendingTrendChart = () => {
    const { filteredTransactions } = useExpenses();

    const data = useMemo(() => {
        const map = {};
        // Sort transactions by date first
        const sorted = [...filteredTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        sorted.forEach(t => {
            // Group by Month-Year or Day depending on range. 
            // For simplicity in this iteration, grouping by Date (YYYY-MM-DD)
            const dateKey = format(new Date(t.date), 'MMM dd');
            map[dateKey] = (map[dateKey] || 0) + t.amount;
        });

        return Object.keys(map).map(key => ({ date: key, amount: map[key] }));
    }, [filteredTransactions]);

    if (data.length === 0) {
        return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No data available</div>;
    }

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(val) => `$${val}`}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow)' }}
                        formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#2563eb" fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
