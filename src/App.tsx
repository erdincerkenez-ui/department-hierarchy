import React, { useState, useMemo } from "react";
import jsonDataRaw from "./data.json";
import Department from "./components/Department"; // Import recursive component
import { searchDepartments, sanitizeData, Department as DeptType } from "./utils/search"; // Import search function and type
import "./styles/App.scss"; // Import SCSS file

const jsonData = sanitizeData(jsonDataRaw); // Ensure data is cleaned

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term


  // Use useMemo to cache search results 
  const filteredDepartments: DeptType[] = useMemo(() => {
    return searchTerm.trim() === "" ? jsonData : searchDepartments(jsonData, searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>Organization Structure</h1>

      {/* Search Input Field */}
      <div className="search-container">
      <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search departments by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
           {searchTerm && <button className="clear-button" onClick={() => setSearchTerm("")}>X</button>}
      </div>

       {/* Showing results message */}

       {searchTerm && <p className="results-text">Showing results for "{searchTerm}"</p>}

      {filteredDepartments.map((dept) => (
          <Department key={dept.id} {...dept} searchTerm={searchTerm} />
        ))}
    </div>
  );
};

export default App;
