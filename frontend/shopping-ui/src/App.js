import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import PromptPage from "pages/PromptPage";
import ShopPage from "pages/ShopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<PromptPage />} />
      </Routes>
    </Router>
  );
}

export default App;