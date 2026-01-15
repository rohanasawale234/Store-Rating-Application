import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      api.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      api.get("/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([statsRes, usersRes, storesRes]) => {
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setStores(storesRes.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load admin dashboard data");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="p-6">No dashboard data available</p>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded shadow">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <p className="text-gray-500">Total Stores</p>
          <p className="text-2xl font-bold">{stats.totalStores}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <p className="text-gray-500">Total Ratings</p>
          <p className="text-2xl font-bold">{stats.totalRatings}</p>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.address}</td>
                <td className="border p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stores Table */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Stores</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.address}</td>
                <td className="border p-2">{s.rating ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
