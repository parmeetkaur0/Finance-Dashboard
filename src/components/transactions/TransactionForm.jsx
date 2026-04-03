import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { CATEGORIES } from "../../utils/constants";

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "12px",
  color: "var(--text-tertiary)",
  marginBottom: "6px",
  display: "block",
};

export function TransactionForm({ onClose, onSave, initialData = null }) {
  const [form, setForm] = useState(
    initialData || {
      date: "",
      desc: "",
      amount: "",
      category: "Food",
      type: "expense",
    }
  );

  const handleSubmit = () => {
    if (!form.date || !form.desc || !form.amount) return;
    const amount = form.type === "expense" ? -Math.abs(parseFloat(form.amount)) : Math.abs(parseFloat(form.amount));
    onSave({ ...form, amount });
    onClose();
  };

  return (
    <Modal title={initialData ? "Edit Transaction" : "Add Transaction"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <input
            placeholder="e.g. Grocery Store"
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Amount (USD)</label>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              style={inputStyle}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            style={inputStyle}
          >
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} style={{ flex: 2 }}>
            {initialData ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}