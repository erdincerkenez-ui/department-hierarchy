import React, { useState, useEffect, memo } from "react";
import { Department as DepartmentType } from "../utils/search";
import "../styles/Department.scss";

// Define the props structure for the department component
interface DepartmentProps extends DepartmentType {
  searchTerm: string;
}

// Function to highlight matching search terms
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
};

// Recursive component to render hierarchical departments
const Department: React.FC<DepartmentProps> = memo(
  ({ id, name, description, subDepartments = [], searchTerm }) => {
    const [isOpen, setIsOpen] = useState(true);

    // Check if the department matches the search
    const matchesSearch =
      searchTerm &&
      (name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()));

    const hasMatchingSubDepartments =
      subDepartments.length > 0 &&
      subDepartments.some(
        (sub) =>
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Automatically open the department if it matches the search or any of its sub-departments match
    useEffect(() => {
      if (searchTerm.trim() !== "") {
        setIsOpen(true);
      }
    }, [searchTerm, matchesSearch, hasMatchingSubDepartments]);

    // Toggle function
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div className={`department ${matchesSearch ? "highlighted" : ""}`}>
        <div className="department-header" onClick={toggleOpen}>
          {/* Arrow icon */}
          <span className={`arrow ${isOpen ? "open" : "closed"}`}>▶</span>
          <h3>{highlightText(name, searchTerm)}</h3>
        </div>
        <p>{highlightText(description, searchTerm)}</p>

        {/* Ensure subDepartments is correctly typed and pass searchTerm */}
        {isOpen && subDepartments.length > 0 && (
          <div className="sub-departments">
            {subDepartments.map((sub) => (
              <Department key={sub.id} {...sub} searchTerm={searchTerm} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default Department;
