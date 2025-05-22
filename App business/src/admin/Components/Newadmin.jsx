import React, { useState, useEffect } from "react";
import axios from "axios";

const Newadmin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/adminlogin/dashbordadmin/newadmin"
      );
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Create or Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 🔁 Update
        await axios.put(
          `http://localhost:5000/adminlogin/dashbordadmin/newadmin/${editingId}`,
          form
        );
        alert("Admin updated!");
      } else {
        // ➕ Create
        await axios.post(
          "http://localhost:5000/adminlogin/dashbordadmin/newadmin",
          form
        );
        alert("Admin created!");
      }
      setForm({
        username: "",
        password: "",
        email: "",
        createdAt: new Date().toISOString().split("T")[0],
      });
      setEditingId(null);
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  // ✅ Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/adminlogin/dashbordadmin/newadmin/${id}`
      );
      fetchAdmins();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Edit admin
  const handleEdit = (admin) => {
    setForm({
      username: admin.username,
      email: admin.email,
      password: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setEditingId(admin._id);
  };

  // ✅ Filtered list
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-white">
        {editingId ? "Update Admin" : "New Admin"}
      </h1>

      {/* Form */}
      <div className="bg-white/80 rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={editingId ? "New Password (optional)" : "Password"}
            className="w-full p-2 border rounded"
            required={!editingId}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <label className="block font-semibold">Created At</label>
          <input
            type="date"
            name="createdAt"
            value={form.createdAt}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Admin" : "Create Admin"}
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Admins List */}
      <div className="bg-white/80 rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">All Admins</h2>
        {filteredAdmins.length === 0 ? (
          <p>No admins found.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin._id} className="border-b">
                  <td className="p-2">{admin.username}</td>
                  <td className="p-2">{admin.email}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Newadmin;
