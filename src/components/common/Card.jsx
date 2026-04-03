import React from "react";

export function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}