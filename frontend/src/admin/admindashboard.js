import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admindashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("https://event-backend-ildw.onrender.com/event/allevents");
    setEvents(res.data);
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setEditId(null);
  };

  const submitEvent = async (e) => {
    e.preventDefault();
    const data = { title, description, date, time, location };

    if (editId) {
      await axios.put(`https://event-backend-ildw.onrender.com/event/editevent/${editId}`, data);
      alert("Event updated");
    } else {
      await axios.post("https://event-backend-ildw.onrender.com/event/addevent", data);
      alert("Event added");
    }

    resetForm();
    fetchEvents();
    setActiveTab("events");
  };

  const editEvent = (ev) => {
    setTitle(ev.title);
    setDescription(ev.description);
    setDate(ev.date);
    setTime(ev.time);
    setLocation(ev.location);
    setEditId(ev._id);
    setActiveTab("add");
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await axios.delete(`https://event-backend-ildw.onrender.com/event/deleteevent/${id}`);
    fetchEvents();
  };

  const viewUsers = async (eventId) => {
    const res = await axios.get(
      `https://event-backend-ildw.onrender.com/event/registrations/${eventId}`
    );
    setUsers(res.data);
    setActiveTab("users");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

  <button
    onClick={handleLogout}
    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  >
    Logout
  </button>
</div>


      <div className="flex gap-3 mb-6">
        <button
          onClick={() => { resetForm(); setActiveTab("add"); }}
          className={`px-4 py-2 rounded ${
            activeTab === "add"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Add Event
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 rounded ${
            activeTab === "events"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Manage Events
        </button>
      </div>

      {activeTab === "add" && (
        <div className="bg-white p-5 rounded shadow max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {editId ? "Edit Event" : "Add New Event"}
          </h2>

          <form onSubmit={submitEvent} className="space-y-3">
            <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
            <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
            <input type="date" className="w-full border p-2 rounded" value={date} onChange={e=>setDate(e.target.value)} required />
            <input type="time" className="w-full border p-2 rounded" value={time} onChange={e=>setTime(e.target.value)} required />
            <input className="w-full border p-2 rounded" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} required />

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              {editId ? "Update Event" : "Save Event"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "events" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(ev => (
            <div key={ev._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-600">{ev.description}</p>
              <p className="text-sm mt-1">{ev.date} | {ev.time}</p>
              <p className="text-sm mb-3">{ev.location}</p>

              <div className="flex gap-2">
                <button onClick={()=>editEvent(ev)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                <button onClick={()=>deleteEvent(ev._id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                <button onClick={()=>viewUsers(ev._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Users</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-white p-4 rounded shadow max-w-md">
          <h2 className="font-semibold mb-3">Registered Users</h2>
          {users.length === 0 ? (
            <p>No registrations</p>
          ) : (
            users.map(u => (
              <p key={u._id} className="text-sm">
                {u.userId.name} – {u.userId.email}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Admindashboard;
