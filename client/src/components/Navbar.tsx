import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { useSearchBarStore } from "../zustand/searchBarStore";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { setSearchTerm, showSearchBar } = useSearchBarStore();

  return (
    <nav className="flex items-center justify-between h-16 px-8 uppercase">
      <Link className="text-xl font-bold" to="/">
        Astra
      </Link>

      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.isAdmin ? (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        ) : null}
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <button className="uppercase" onClick={logout}>
              Log out
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
