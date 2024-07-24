// SearchStudent.js

import React, { useState } from 'react';

const App = () => {
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchTerm(searchTerm.trim());
            handleSearch();
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

  function handleSearch() {
    const payload = {"StudentID":searchTerm}
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
  };

  return (
    <div>
      <Header/>
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
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Student ID:</label>
            <input
              type="text"
              className="form-input"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly // Make this input readonly
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
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Course:</label>
            <input
              type="text"
              className="form-input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Year:</label>
            <input
              type="text"
              className="form-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Guardian Name:</label>
            <input
              type="text"
              className="form-input"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Guardian Phone:</label>
            <input
              type="tel"
              className="form-input"
              value={guardianPhone}
              onChange={(e) => setGuardianPhone(e.target.value)}
              readOnly // Make this input readonly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
