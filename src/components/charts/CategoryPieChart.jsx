import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#c4b5fd', '#8b5cf6', '#a78bfa', '#f472b6'];

export const CategoryPieChart = () => {
    const { filteredTransactions } = useExpenses();

    const data = useMemo(() => {
        const map = {};
        filteredTransactions.forEach(t => {
            // Normalize category case
            const cat = t.category || 'Uncategorized';
            map[cat] = (map[cat] || 0) + t.amount;
        });

        return Object.keys(map)
            .map(key => ({ name: key, value: map[key] }))
            .sort((a, b) => b.value - a.value); // Sort for better visualization
    }, [filteredTransactions]);

    if (data.length === 0) {
        return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No data available</div>;
    }

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `$${value.toFixed(2)}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow)' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
