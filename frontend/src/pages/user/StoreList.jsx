import { useEffect, useState } from "react";
import { getStores } from "../../services/store.service";
import {
  submitRating,
  updateRating,
  getUserRating,
} from "../../services/rating.service";
import StarRating from "../../components/common/StarRating";
import { toast } from "react-toastify";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setLoading(true);

      const res = await getStores();
      setStores(res.data);

      const ratingsMap = {};
      for (const store of res.data) {
        try {
          const ratingRes = await getUserRating(store.id);
          if (ratingRes.data && ratingRes.data.rating) {
            ratingsMap[store.id] = ratingRes.data.rating;
          }
        } catch {
          // user has not rated this store
        }
      }

      setUserRatings(ratingsMap);
    } catch (err) {
      toast.error("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (storeId, rating) => {
    try {
      if (userRatings[storeId]) {
        await updateRating(storeId, { rating });
      } else {
        await submitRating({ storeId, rating });
      }

      setUserRatings((prev) => ({
        ...prev,
        [storeId]: rating,
      }));

      toast.success("Rating saved ⭐");
      loadStores();
    } catch (err) {
      toast.error(err.response?.data?.message || "Rating failed");
    }
  };

  const filteredStores = stores.filter((store) =>
    `${store.name} ${store.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="p-6">Loading stores...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Stores</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by store name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-6 w-full rounded"
      />

      {filteredStores.length === 0 && (
        <p className="text-gray-500">No stores found</p>
      )}

      <div className="space-y-4">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="border p-4 rounded flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            {/* Store Info */}
            <div>
              <h3 className="font-semibold text-lg">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.address}</p>
            </div>

            {/* Rating Info */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="font-bold mb-1">
                {store.average_rating ?? "N/A"}
              </p>

              <p className="text-sm text-gray-500">Your Rating</p>

              <StarRating
                value={userRatings[store.id] || 0}
                onChange={(rating) => handleRate(store.id, rating)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
