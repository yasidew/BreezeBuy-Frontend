import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Inventory from "./pages/inventory";
import ManageInventory from "./pages/manageinventory";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<ManageInventory />} />
          <Route path="/inventory/edit/:id" element={<ManageInventory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
