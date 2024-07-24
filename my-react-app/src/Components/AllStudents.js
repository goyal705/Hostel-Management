import React, { useState, useEffect } from 'react';
import './AllStudents.css';
import * as XLSX from 'xlsx';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false); // New flag to track if a filter is applied
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  useEffect(() => {
    // Fetch the students data from the backend
    fetch("http://127.0.0.1:5000/getallstudents")
      .then(response => response.json())
      .then(data => {
        setStudents(data.Allstudentsdata);
        setFilteredStudents(data.Allstudentsdata);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const applyFilter = () => {
    const trimmedFilter = filterCriteria.trim();
    if (trimmedFilter) {
      const filters = trimmedFilter.split(',').map(filter => filter.trim());
      let filteredData = students.filter(student => {
        let isMatched = false;
        filters.forEach(filter => {
          if (
            student.StudentName.toLowerCase() === filter.toLowerCase() ||
            student.Course.toLowerCase() === filter.toLowerCase() ||
            student.Year.toString() === filter ||
            student.StudentID.toString() === filter
          ) {
            isMatched = true;
          }
        });
        return isMatched;
      });
      setFilteredStudents(filteredData);
      setIsFilterApplied(true); // Set flag to true when filter is applied
      setCurrentPage(1); // Reset to first page
    } else {
      setFilteredStudents(students);
      setIsFilterApplied(false); // Set flag to false when filter is cleared
    }
  };

  const clearFilter = () => {
    setFilterCriteria('');
    setFilteredStudents(students);
    setIsFilterApplied(false); // Set flag to false when filter is cleared
    setCurrentPage(1); // Reset to first page
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      applyFilter();
    }
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const exportToExcel = () => {
    const fileName = "students_data.xlsx";
    const dataToExport = isFilterApplied ? filteredStudents : students; // Export filtered data if filter is applied, else export all data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, fileName);
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="filter-controls">
        <h1>All Students</h1>
        <button className='button-filter' onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
          {isDropdownVisible ? 'Disable Filtering' : 'Enable Filtering'}
        </button>
        {isDropdownVisible && (
          <div className="filter-dropdown">
            <input
              type="text"
              placeholder="Filter by student ID, name, course, year"
              value={filterCriteria}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={applyFilter}>Apply</button>
            <button onClick={clearFilter}>Clear</button>
          </div>
        )}
        <button className='buttonexporttoexcel' onClick={exportToExcel}>
          Export Data to Excel
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Course</th>
            <th>Year</th>
            <th>Guardian Name</th>
            <th>Guardian Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents && currentStudents.length > 0 ? (
            currentStudents.map(student => (
              <tr key={student.StudentID}>
                <td>{student.StudentName}</td>
                <td>{student.StudentID}</td>
                <td>{student.Email}</td>
                <td>{student.StudentContact}</td>
                <td>{student.Address}</td>
                <td>{student.DateOfBirth}</td>
                <td>{student.Course}</td>
                <td>{student.Year}</td>
                <td>{student.GuardianName}</td>
                <td>{student.GuardianContact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={filteredStudents.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AllStudents;
