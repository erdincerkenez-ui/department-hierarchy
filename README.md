# department-hierarchy - React Hierarchical Search

This project is a **React-based hierarchical data visualization and search application**,

## Features

✅ **Recursive Rendering:** 
✅ **Instant Search:** 
✅ **Context-Preserving Search:** 
✅ **Auto Expand on Search:**  
✅ **Stylish UI:** Uses **SCSS** 
✅ **Performance Optimized:**

---

## Project Structure

organization-structure/ │── src/ │ ├── components/ │ │ ├── Department.tsx # Recursive department component │ ├── utils/ │ │ ├── search.ts # Recursive search algorithm │ ├── styles/ │ │ ├── App.scss # Main SCSS styles │ │ ├── Department.scss # Department-specific styles │ ├── App.tsx # Main application logic │ ├── data.json # Hierarchical department dataset │── public/ │── README.md │── package.json │── tsconfig.json │── .gitignore │── node_modules/

---

## Installation & Setup

Follow these steps to set up the project on your local machine:

### Clone the Repository
git clone https://github.com/erdincerkenez-ui/department-hierarchy.git
cd department-hierarchy

npm install

npm start

The application will be accessible at http://localhost:3000/

### Technologies Used
React.js (with hooks & recursion)
TypeScript
SCSS (Sass)
useMemo for optimization

### Error Handling & Edge Cases
- Handles empty search terms (shows all departments when input is empty).
- Supports large datasets efficiently without performance lag.
- Manages incorrect JSON formats using validation.

