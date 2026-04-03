import React from "react";

export function Button({ children, variant = "primary", onClick, disabled, className = "" }) {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      color: "white",
    },
    secondary: {
      background: "rgba(255,255,255,0.07)",
      color: "var(--text-primary)",
      border: "1px solid var(--border)",
    },
    danger: {
      background: "rgba(239,68,68,0.15)",
      color: "#f87171",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)",
    },
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "9px 18px",
        borderRadius: "9px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "13px",
        fontWeight: 600,
        border: style.border || "none",
        background: style.background,
        color: style.color,
        transition: "all 0.15s",
        opacity: disabled ? 0.5 : 1,
      }}
      className={className}
    >
      {children}
    </button>
  );
}