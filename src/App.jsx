import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { FilterBar } from './components/inputs/FilterBar';
import { ExpenseProvider } from './context/ExpenseContext';
import { LayoutDashboard, List, PieChart } from 'lucide-react';
import { BudgetManager } from './components/BudgetManager';

// Sidebar items definition moved here or passed to Layout
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: List },
  { id: 'budget', label: 'Budget', icon: PieChart },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Transactions</h2>
            <FilterBar />
            <TransactionList />
          </div>
        );
      case 'budget':
        return <BudgetManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar - Inline for simplicity due to state sharing or pass props */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        padding: '1.5rem',
        position: 'fixed',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 10
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

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                width: '100%',
                border: 'none',
                background: activeTab === item.id ? '#eff6ff' : 'transparent',
                color: activeTab === item.id ? '#2563eb' : '#64748b',
                borderRadius: '0.5rem',
                textAlign: 'left',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        width: 'calc(100% - 260px)'
      }}>
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
