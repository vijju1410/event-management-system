import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const showMessage = (msg, msgType = "error") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://event-backend-ildw.onrender.com/register/addregister",
        {
          name,
          email,
          password,
          role: "user",
        }
      );

      showMessage(res.data.message, "success");

      if (res.data.message.includes("success")) {
        setTimeout(() => {
          nav("/login");
        }, 800);
      }
    } catch {
      showMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">
          Register
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
