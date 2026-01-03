import React from 'react';
import { clsx } from 'clsx';
import { LayoutDashboard, Upload, PieChart, Settings } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1",
            active
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            width: '100%',
            border: 'none',
            background: active ? '#eff6ff' : 'transparent',
            color: active ? '#2563eb' : '#64748b',
            borderRadius: '0.5rem',
            textAlign: 'left'
        }}
    >
        <Icon size={20} />
        <span>{label}</span>
    </button>
);

export const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: 'var(--bg-card)',
                borderRight: '1px solid var(--border)',
                padding: '1.5rem',
                position: 'fixed',
                height: '100vh',
                top: 0,
                left: 0
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <PieChart size={20} />
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>Expensify</h1>
                </div>

                <nav>
                    {/* Navigation items can be driven by state later if we have routing */}
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>Menu</div>
                    {/* Placeholder navigation for visual structure */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                        <SidebarItem icon={Upload} label="Import Data" />
                        <SidebarItem icon={Settings} label="Budget Settings" />
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '260px',
                flex: 1,
                padding: '2rem',
                maxWidth: '1200px',
                width: 'calc(100% - 260px)'
            }}>
                {children}
            </main>
        </div>
    );
};
