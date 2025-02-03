import React, { useState, memo } from "react";
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
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

// Recursive component to render hierarchical departments
const Department: React.FC<DepartmentProps> = memo(({ id, name, description, subDepartments = [], searchTerm }) => {
  const [isOpen, setIsOpen] = useState(true);
    // Toggle function
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className="department">
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
});

export default Department;
