import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { FilterBar } from './components/inputs/FilterBar';
import { ExpenseProvider } from './context/ExpenseContext';
import { LayoutDashboard, List, PieChart, Menu, X } from 'lucide-react';
import { BudgetManager } from './components/BudgetManager';
import './styles/styles.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: List },
  { id: 'budget', label: 'Budget', icon: PieChart },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

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
    <div className="app-container">
      {/* Mobile Overlay */}
      <div
        className={clsx("mobile-overlay", isSidebarOpen && "visible")}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={clsx("sidebar", isSidebarOpen && "open")}>
        <div className="sidebar-header">
          <div className="logo-box">
            <PieChart size={20} />
          </div>
          <h1 className="logo-text">Expensify</h1>
        </div>

        <nav className="nav-menu">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                closeSidebar(); // Close on mobile click
              }}
              className={clsx("nav-item", activeTab === item.id && "active")}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Mobile Toggle FAB */}
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
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
