import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/owner/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load owner dashboard");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (!data) {
    return <p className="p-6">No store data available</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Store Owner Dashboard</h2>

      {/* Store Info Card */}
      <div className="border rounded p-4 shadow-sm bg-white">
        <h3 className="text-xl font-semibold">{data.store.name}</h3>
        <p className="text-gray-600 mt-1">
          Average Rating:{" "}
          <span className="font-bold">
            {data.averageRating ?? "N/A"}
          </span>
        </p>
      </div>

      {/* Ratings Table */}
      <div>
        <h3 className="text-xl font-semibold mb-3">
          User Ratings
        </h3>

        {data.ratings.length === 0 ? (
          <p className="text-gray-500">
            No ratings submitted yet
          </p>
        ) : (
          <table className="w-full border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.ratings.map((r, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    {r.user_name}
                  </td>
                  <td className="border p-2">
                    ⭐ {r.rating}
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

export default OwnerDashboard;
