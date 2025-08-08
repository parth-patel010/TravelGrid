import React, { useState } from "react";

export default function SearchComponent() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);

const handleSearch = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, category }),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message); // Will show "You searched for: ..."
    }
    if (data.results) {
      setResults(data.results);
    }
  } catch (error) {
    console.error("Error searching:", error);
  }
};


  return (
    <div>
      <h2>Search Destinations</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
