import React from 'react';
import { Search } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';

export const FilterBar = () => {
    const { filters, setFilters, categories } = useExpenses();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            alignItems: 'center'
        }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    name="search"
                    placeholder="Search transactions..."
                    value={filters.search}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '0.625rem 0.625rem 0.625rem 2.5rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem'
                    }}
                />
            </div>

            {/* Category Filter */}
            <div style={{ minWidth: '150px' }}>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '0.625rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem',
                        backgroundColor: 'white'
                    }}
                >
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Date Range - Simplified for now */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    style={{
                        padding: '0.625rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem'
                    }}
                />
                <span style={{ color: 'var(--text-muted)' }}>—</span>
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    style={{
                        padding: '0.625rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem'
                    }}
                />
            </div>
        </div>
    );
};
