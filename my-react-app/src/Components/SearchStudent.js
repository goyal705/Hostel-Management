import React, { useState } from 'react';
import './SearchStudent.css';

const SearchStudent = () => {
    const [studentName, setStudentName] = useState("");
    const [studentID, setStudentID] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [guardianPhone, setGuardianPhone] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchTerm(searchTerm.trim());
            handleSearch();
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const payload = { "StudentID": searchTerm };
        fetch("http://127.0.0.1:5000/getstudentsdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                if (Object.keys(data).length === 0) {
                    clearForm();
                    alert("No Result Found");
                } else {
                    setStudentName(data.StudentName);
                    setStudentID(data.StudentID);
                    setEmail(data.Email);
                    setPhone(data.StudentContact);
                    setAddress(data.Address);
                    setDob(data.DateOfBirth);
                    setCourse(data.Course);
                    setYear(data.Year);
                    setGuardianName(data.GuardianName);
                    setGuardianPhone(data.GuardianContact);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const clearForm = () => {
        setStudentName("");
        setStudentID("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDob("");
        setCourse("");
        setYear("");
        setGuardianName("");
        setGuardianPhone("");
        setIsEditable(false); // Reset editable state when form is cleared
    };

    const handleUpdate = () => {
        if (isEditable) {
            const payload = {
                StudentName: studentName,
                StudentID: studentID,
                Email: email,
                StudentContact: phone,
                Address: address,
                DateOfBirth: dob,
                Course: course,
                Year: year,
                GuardianName: guardianName,
                GuardianContact: guardianPhone
            };

            fetch("http://127.0.0.1:5000/updatestudentdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.Status === "True") {
                        alert("Data updated successfully");
                    } else {
                        alert("An error occurred");
                    }
                })
                .catch(error => console.error('Error updating data:', error));
        }

        setIsEditable(!isEditable); // Toggle editable state
    };

    const handledelete = () => {
        if (!studentName && !studentID && !email && !phone && !address && !dob && !course && !year && !guardianName && !guardianPhone) {
            alert('No Data To Delete');
            return;
        }
        else {
            const payload = {
                StudentID: studentID,
            };
            fetch("http://127.0.0.1:5000/deletestudentdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.Status === "True") {
                        alert("Data updated successfully");
                    } else {
                        alert("An error occurred");
                    }
                })
                .catch(error => console.error('Error updating data:', error));
        }
    }

    return (
        <div>
            <div className='heading-studentdata'>
                <div className='heading-studentdata-heading'>
                    <h2>Students Data</h2>
                </div>
                <div className='heading-studentdata-search'>
                    <div className="search-box">
                        <input
                            type="integer"
                            className="search-input"
                            placeholder="Enter student id"
                            value={searchTerm}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div className="form-column">
                    <div className="form-group">
                        <label className="form-label">Student Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Student ID:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={studentID}
                            onChange={(e) => setStudentID(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone:</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Address:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label className="form-label">Date of Birth:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Course:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Year:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Guardian Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={guardianName}
                            onChange={(e) => setGuardianName(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Guardian Phone:</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={guardianPhone}
                            onChange={(e) => setGuardianPhone(e.target.value)}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
            </div>
            <div className='button-div'>
                <button className='button-searchstudent' onClick={handleUpdate}>
                    {isEditable ? 'Save Data' : 'Update Data'}
                </button>
                <button className='button-searchstudent' onClick={handledelete}>Delete Data</button>
                <button className='button-searchstudent' onClick={clearForm}>Reset Data</button>
            </div>
        </div>
    );
};

export default SearchStudent;
