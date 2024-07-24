import React, { useState, useEffect } from 'react';
import './Complaints.css';
import * as XLSX from 'xlsx';

const AllStudents = () => {
    const [complaints, setComplaints] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false); // New flag to track if a filter is applied
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // You can change this value to set different items per page

    useEffect(() => {
        // Fetch the complaints data from the backend
        fetch("http://127.0.0.1:5000/getcomplaints")
            .then(response => response.json())
            .then(data => {
                setComplaints(data.Allcomplaintsdata);
                setFilteredComplaints(data.Allcomplaintsdata);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const applyFilter = () => {
        const trimmedFilter = filterCriteria.trim();
        if (trimmedFilter) {
          const filters = trimmedFilter.split(',').map(filter => filter.trim().toLowerCase());
          let filteredData = complaints.filter(complaint => {
            let isMatched = true;
            filters.forEach(filter => {
              if (
                !(
                  complaint.ComplaintNumber.toString() === filter ||
                  complaint.Wing.toLowerCase() === filter ||
                  complaint.WorkingGroup.toLowerCase() === filter ||
                  complaint.Status.toLowerCase() === filter
                )
              ) {
                isMatched = false;
              }
            });
            return isMatched;
          });
          setFilteredComplaints(filteredData);
          setIsFilterApplied(true); // Set filter applied flag to true
        } else {
          setFilteredComplaints(complaints);
          setIsFilterApplied(false); // Set filter applied flag to false
        }
        setCurrentPage(1); // Reset to the first page after applying the filter
    };

    const clearFilter = () => {
        setFilterCriteria('');
        setFilteredComplaints(complaints);
        setIsFilterApplied(false); // Set filter applied flag to false
        setCurrentPage(1); // Reset to the first page after clearing the filter
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
        const fileName = "complaints_data.xlsx";
        const dataToExport = isFilterApplied ? filteredComplaints : complaints; // Export filtered data if filter is applied, otherwise export all data
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        XLSX.writeFile(workbook, fileName);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="filter-controls">
                <h1>Complaints</h1>
                <button className='button-filter' onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                    {isDropdownVisible ? 'Disable Filtering' : 'Enable Filtering'}
                </button>
                {isDropdownVisible && (
                    <div className="filter-dropdown">
                        <input
                            type="text"
                            placeholder="Filter by complaint number, wing, closed date, work group, state"
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
                        <th>Complaint Number</th>
                        <th>Status</th>
                        <th>Complaint By</th>
                        <th>Open Date</th>
                        <th>Description</th>
                        <th>Wing</th>
                        <th>RoomNumber</th>
                        <th>Action Taken</th>
                        <th>Working Group</th>
                        <th>Closed Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map(complaint => (
                            <tr key={complaint.ComplaintNumber}>
                                <td>{complaint.ComplaintNumber}</td>
                                <td>{complaint.Status}</td>
                                <td>{complaint.ComplaintBy}</td>
                                <td>{complaint.ComplaintOpenDate}</td>
                                <td>{complaint.ComplaintDescription}</td>
                                <td>{complaint.Wing}</td>
                                <td>{complaint.RoomNumber}</td>
                                <td>{complaint.ActionTaken}</td>
                                <td>{complaint.WorkingGroup}</td>
                                <td>{complaint.ComplaintClosedDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination-controls">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllStudents;


