import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FinanceProvider } from "./contexts/FinanceContext";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <Layout />
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;