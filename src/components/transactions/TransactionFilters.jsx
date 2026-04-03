import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../../utils/constants";

export function TransactionFilters({ search, setSearch, filterCat, setFilterCat, filterType, setFilterType, resultCount }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        flexWrap: "wrap", 
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row"
      }}>
        <div style={{ position: "relative", flex: "1", minWidth: isMobile ? "100%" : "200px" }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "14px",
              color: "var(--text-tertiary)",
            }}
          >
            ⌕
          </span>
          <input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              paddingLeft: "36px",
            }}
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: "10px", 
          width: isMobile ? "100%" : "auto",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <select 
            value={filterCat} 
            onChange={(e) => setFilterCat(e.target.value)}
            style={{ flex: isMobile ? 1 : "auto" }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ flex: isMobile ? 1 : "auto" }}
          >
            <option value="All">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      
      <div style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "right" }}>
        {resultCount} result{resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}