import React, { useState, useMemo } from "react";
import jsonData from "./data.json";
import Department from "./components/Department"; // Import recursive component
import { searchDepartments, Department as DeptType } from "./utils/search"; // Import search function and type
import "./styles/App.scss"; // Import SCSS file

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term


  // Use useMemo to cache search results 
  const filteredDepartments: DeptType[] = useMemo(() => {
    return searchDepartments(jsonData, searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>Organization Structure</h1>

      {/* Search Input Field */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search departments by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show "No results found" if there are no matches */}
      {filteredDepartments.length === 0 ? (
        <p className="no-results">Sonuç Bulunumadı</p>
      ) : (
        filteredDepartments.map((dept) => (
          <Department key={dept.id} {...dept} searchTerm={searchTerm} />
        ))
      )}
    </div>
  );
};

export default App;
