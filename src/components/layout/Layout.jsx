import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Overview } from "../../pages/Overview";
import { Transactions } from "../../pages/Transactions";
import { Insights } from "../../pages/Insights";
import { TransactionForm } from "../transactions/TransactionForm";
import { useFinance } from "../../contexts/FinanceContext";
import { useTheme } from "../../contexts/ThemeContext";

export function Layout() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { role, setRole, addTransaction } = useFinance();
  const { theme, toggleTheme } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const isAdmin = role === "admin";

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "transactions":
        return <Transactions onAddClick={() => setShowAddModal(true)} />;
      case "insights":
        return <Insights />;
      default:
        return <Overview />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 199,
            backdropFilter: "blur(4px)",
          }}
        />
      )}
      
      {/* Sidebar - Responsive */}
      <div
        style={{
          width: "260px",
          flexShrink: 0,
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 200,
          transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
          boxShadow: isMobile && sidebarOpen ? "2px 0 8px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (isMobile) setSidebarOpen(false);
          }} 
          role={role} 
          setRole={setRole}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: isMobile ? 0 : "260px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Header
          activeTab={activeTab}
          isAdmin={isAdmin}
          onAddClick={() => setShowAddModal(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />
        <div
          style={{
            padding: isMobile ? "16px" : "28px 32px",
            flex: 1,
            maxWidth: "100%",
            overflowX: "hidden",
          }}
          className="fade-in"
        >
          {renderContent()}
        </div>
      </div>

      {showAddModal && (
        <TransactionForm
          onClose={() => setShowAddModal(false)}
          onSave={(newTransaction) => {
            addTransaction(newTransaction);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}