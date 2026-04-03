import React from "react";
import { NAV_ITEMS } from "../../utils/constants";

export function Sidebar({ activeTab, setActiveTab, role, setRole, isMobile, onClose }) {
  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "0 4px", marginBottom: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "9px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              F
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                Finlens
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-tertiary)", lineHeight: 1 }}>
                Financial Dashboard
              </div>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              style={{
                background: "var(--hover-bg)",
                border: "none",
                borderRadius: "6px",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                color: "var(--text-primary)",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: "10px",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "8px",
          paddingLeft: "12px",
        }}
      >
        Navigation
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13.5px",
              fontWeight: 500,
              color: activeTab === item.id ? "var(--text-primary)" : "var(--text-tertiary)",
              background: activeTab === item.id ? "var(--hover-bg)" : "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            fontSize: "10px",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "8px",
            paddingLeft: "12px",
          }}
        >
          Role
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="admin">Admin — Full Access</option>
          <option value="viewer">Viewer — Read Only</option>
        </select>
        <div
          style={{
            marginTop: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            background: role === "admin" ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${role === "admin" ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
            fontSize: "11px",
            color: role === "admin" ? "#a5b4fc" : "var(--text-tertiary)",
            textAlign: "center",
          }}
        >
          {role === "admin" ? "✓ Can add & edit transactions" : "👁 View-only mode"}
        </div>
      </div>
    </>
  );
}