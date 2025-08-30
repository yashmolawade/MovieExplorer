import React from "react";

const Filters = ({ year, setYear, genre, setGenre }) => {
  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      {/* Year Filter */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="px-3 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Years</option>
        {Array.from({ length: 30 }, (_, i) => 2025 - i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Genre Filter */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="px-3 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="10749">Romance</option>
        <option value="27">Horror</option>
        <option value="16">Animation</option>
        <option value="878">Sci-Fi</option>
      </select>
    </div>
  );
};

export default Filters;
