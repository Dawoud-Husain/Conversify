import { useState, useRef, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileSearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const resultsRef = useRef(null); // Reference --> detecting outside clicks

  //Profile search submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    try {
      const res = await fetch(`/api/users/search?query=${search}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResults(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // This use effect will handle clicks outside of the search box (to close it)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]); // Close results
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 rounded-full"
      >
        <input
          type="text"
          placeholder="Profile search…"
          className="search-input rounded-full focus:outline-none px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          <IoSearchSharp className="search-icon" />
        </button>
      </form>

      {/* Search Results Dropdown Box */}
      {results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg border border-gray-300 max-h-60 overflow-y-auto z-50"
        >
          {results.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="block p-3 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.profilePic}
                  alt={`${user.username}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-bold">@{user.username}</p>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSearchBar;
