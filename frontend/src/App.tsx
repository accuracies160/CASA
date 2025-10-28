import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Budgets from "./pages/Budgets";

export default function App() {
  return (
    <Routes>
      {/* Default page ("/") now loads Home */}
      <Route path="/" element={<Home />} />

      {/* Budgets page */}
      <Route path="/budgets" element={<Budgets />} />

      {/* Any unknown URL will redirects to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
