import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const nav = useNavigate();

  const showMessage = (msg, msgType = "error") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(""), 2000);
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://event-backend-ildw.onrender.com/register/login",
        { email, password }
      );

      if (res.data.success) {
        showMessage("Login successful", "success");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        setTimeout(() => {
          if (res.data.role === "admin") {
            nav("/admin");
          } else {
            nav("/home");
          }
        }, 800);
      } else {
        showMessage(res.data.message || "Login failed");
      }
    } catch {
      showMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">
          Login
        </h2>

        {message && (
          <div
            className={`mb-3 px-3 py-2 text-sm rounded ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handlelogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Not registered?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
