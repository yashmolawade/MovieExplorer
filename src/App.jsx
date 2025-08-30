import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, resetMovies } from "./app/movieSlice";
import MovieCard from "./components/MovieCard";

const App = () => {
  const disptach = useDispatch();
  const { list, loading, error, page, category, query } = useSelector(
    (state) => state.movies
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      disptach(resetMovies());
      disptach(fetchMovies({ query: search, page: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [search, disptach]);

  useEffect(() => {
    disptach(fetchMovies({ category: "now_playing", page: 1 }));
  }, [disptach]);

  const handleCategory = (cat) => {
    disptach(resetMovies());
    disptach(fetchMovies({ category: cat, page: 1 }));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      disptach(fetchMovies({ category, page: page + 1, query }));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const myFilter = (arr, cb) => {
    if (typeof cb !== "function") {
      throw new TypeError("cb is not a function");
    }
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (cb(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
  };

  const filterMovies = myFilter(list, (movie) => {
    let year = movie.release_date
      ? parseInt(movie.release_date.split("-")[0])
      : 0;
    return year >= 2015;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🎬 Movies Explorer
      </h1>

      {/* Category */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {["now_playing", "popular", "top_rated", "upcoming"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className="px-4 py-2 rounded-full bg-white shadow hover:bg-blue-500 hover:text-white transition"
          >
            {cat.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search Movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Movies list */}
      <div className="text-center">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && filterMovies.length === 0 && (
          <p className="text-gray-500">No results Found</p>
        )}
      </div>

      {/* Movie Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <MovieCard list={filterMovies} />
      </div>
    </div>
  );
};

export default App;
