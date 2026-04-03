import React from "react";
import { Button } from "../common/Button";
import { NAV_ITEMS } from "../../utils/constants";

export function Header({ activeTab, isAdmin, onAddClick, theme, onToggleTheme, onMenuClick, isMobile, sidebarOpen }) {
  const currentTab = NAV_ITEMS.find((n) => n.id === activeTab);

  return (
    <div
      style={{
        padding: isMobile ? "12px 16px" : "20px 32px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--header-bg)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        {isMobile && (
          <button
            onClick={onMenuClick}
            style={{
              background: "var(--hover-bg)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
            }}
          >
            ☰
          </button>
        )}
        <div>
          <div style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 700, color: "var(--text-primary)" }}>
            {currentTab?.label}
          </div>
          {!isMobile && (
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={onToggleTheme}
          style={{
            background: "var(--hover-bg)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "16px",
            minWidth: "40px",
          }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        
        {isAdmin && activeTab === "transactions" && (
          <Button variant="primary" onClick={onAddClick}>
            {isMobile ? "+" : "+ Add Transaction"}
          </Button>
        )}
        
        {!isMobile && (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {isAdmin ? "A" : "V"}
          </div>
        )}
      </div>
    </div>
  );
}