import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const showMessage = (msg, msgType = "error") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(""), 2000);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://event-backend-ildw.onrender.com/event/allevents");
      setEvents(res.data);
    } catch {
      showMessage("Could not load events");
    }
  };

  const registerEvent = async (eventId) => {
    try {
      const res = await axios.post(
        "https://event-backend-ildw.onrender.com/event/registerevent",
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showMessage(res.data.message, "success");
    } catch {
      showMessage("Registration failed");
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Events</h2>

        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="p-6">
        {message && (
          <div
            className={`mb-4 px-3 py-2 text-sm rounded w-fit ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <h3 className="text-xl font-semibold mb-5">
          Upcoming Events
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg mb-1">
                {event.title}
              </h4>

              <p className="text-sm text-gray-600 mb-3">
                {event.description}
              </p>

              <div className="text-sm text-gray-500 mb-4">
                <p>{event.date} | {event.time}</p>
                <p>{event.location}</p>
              </div>

              <button
                onClick={() => registerEvent(event._id)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
