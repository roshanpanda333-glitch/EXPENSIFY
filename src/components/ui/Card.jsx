import React from 'react';

export const Card = ({ title, value, icon: Icon, trend }) => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>{value}</h3>
                </div>
                <div style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    color: 'var(--primary)'
                }}>
                    {Icon && <Icon size={20} />}
                </div>
            </div>
            {trend && (
                <div style={{ fontSize: '0.75rem', color: trend > 0 ? 'var(--danger)' : 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>{trend > 0 ? '+' : ''}{trend}%</span>
                    <span style={{ color: 'var(--text-muted)' }}>from last month</span>
                </div>
            )}
        </div>
    );
};
