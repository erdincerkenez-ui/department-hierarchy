// Define the structure of a department
export interface Department {
  id: number;
  name: string;
  description: string;
  subDepartments?: Department[];
}

// Function to validate and sanitize JSON data
export const sanitizeData = (departments: any[]): Department[] => {
  return departments
    .filter(
      (dept) =>
        dept && typeof dept.id === "number" && typeof dept.name === "string"
    )
    .map((dept) => ({
      id: dept.id,
      name: dept.name || "Unnamed Department",
      description: dept.description || "No description available",
      subDepartments: Array.isArray(dept.subDepartments)
        ? sanitizeData(dept.subDepartments)
        : [],
    }));
};

// Recursive Search Function
export const searchDepartments = (
  departments: Department[],
  searchTerm: string
): Department[] => {
  // If the search term is empty, return all departments
  if (!searchTerm.trim()) {
    return departments;
  }

  // Create an empty list to store matching results
  let filteredResults: Department[] = [];

  // Loop through all departments
  for (let dept of departments) {
    // Check if the department name or description contains the search term
    const isMatch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase());

    // search recursively
    let filteredSubDepartments: Department[] = [];
    if (dept.subDepartments && dept.subDepartments.length > 0) {
      filteredSubDepartments = searchDepartments(
        dept.subDepartments,
        searchTerm
      );
    }

    // include it in results
    if (isMatch || filteredSubDepartments.length > 0) {
      // Add the department, keeping only the matching sub-departments
      filteredResults.push({
        ...dept,
        subDepartments: filteredSubDepartments,
      });
    }
  }

  // Return the filtered results
  return filteredResults;
};
