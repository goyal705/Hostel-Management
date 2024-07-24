import React, { useState, useEffect } from 'react';
import './SeeProfile.css';

const SeeProfile = ({ userID }) => {
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
    const [pictureURL, setPictureURL] = useState(""); // New state for picture URL
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/seeprofile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.Status === "True") {
                        setTimeout(() => {
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
                            // setPictureURL(data.PictureURL); // Set the picture URL
                            setIsDataLoaded(true);
                        }, 1000); // 1 second delay
                    } else {
                        console.error('Failed to fetch student profile data');
                    }
                } else {
                    console.error('Response not OK');
                }
            } catch (error) {
                console.error('Error fetching student profile data:', error);
            }
        };

        fetchProfileData();
    }, [userID]);

    return (
        <div className="see-profile">
            <h2>Student Profile</h2>
            {isDataLoaded ? (
                <div className="form-container">
                    <div className="form-column">
                        <div className="picture-container">
                            {pictureURL ? (
                                <img src={pictureURL} alt="Student" className="student-picture" />
                            ) : (
                                <div className="picture-placeholder">No Image Available</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Student Name:</label>
                            <input type="text" className="form-input" value={studentName} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Student ID:</label>
                            <input type="text" className="form-input" value={studentID} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-input" value={email} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone:</label>
                            <input type="tel" className="form-input" value={phone} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Address:</label>
                            <input type="text" className="form-input" value={address} readOnly />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label className="form-label">Date of Birth:</label>
                            <input type="text" className="form-input" value={dob} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Course:</label>
                            <input type="text" className="form-input" value={course} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Year:</label>
                            <input type="text" className="form-input" value={year} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Guardian Name:</label>
                            <input type="text" className="form-input" value={guardianName} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Guardian Phone:</label>
                            <input type="tel" className="form-input" value={guardianPhone} readOnly />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default SeeProfile;
