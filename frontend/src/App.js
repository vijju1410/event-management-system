import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Admindashboard from "./admin/admindashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

       <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admindashboard />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
