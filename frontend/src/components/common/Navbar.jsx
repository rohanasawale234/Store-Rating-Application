import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold">StoreRatings</h1>

      <div className="flex gap-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin/dashboard">Dashboard</Link>
        )}

        {user?.role === "USER" && <Link to="/stores">Stores</Link>}

        {user?.role === "STORE_OWNER" && (
          <Link to="/owner/dashboard">Dashboard</Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
