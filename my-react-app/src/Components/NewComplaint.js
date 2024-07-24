import React, { useState, useEffect } from 'react';
import './NewComplaint.css';

const NewComplaint = ({ userID }) => {
    const [complaintBy, setComplaintBy] = useState("");
    const [description, setDescription] = useState("");
    const [wing, setWing] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [workingGroup, setWorkingGroup] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isSelfComplaint, setIsSelfComplaint] = useState(true);
    const [complaintByID, setComplaintByID] = useState("");

    const workingGroups = [
        "Maintainence Team", "Plumbing Department", "HVAC Team", "IT Support", 
        "Electrical Department", "Building Maintainence", "Electronics Department", 
        "Appliance Repair Team", "Secuirity Department", "Facilities Management"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const opendate = gettimestamp();
        const payload = {
            "ComplaintBy": userID,
            "ComplaintFor": complaintByID,
            "ComplaintDescription": description,
            "Wing": wing,
            "RoomNumber": roomNumber,
            "WorkingGroup": workingGroup,
            'Status': "New",
            "ComplaintOpenDate": opendate,
            "ActionTaken": "NA"
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/submitcomplaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.Status === "True") {
                    alert('Complaint submitted successfully');
                } else {
                    console.error('Failed to submit complaint');
                }
            } else {
                console.error('Response not OK');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    const setwingroomno = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/getwingroomno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: id }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.Status === "True") {
                    setTimeout(() => {
                        setComplaintBy(data.Name);
                        setWing(data.Wing);
                        setRoomNumber(data.RoomNumber);
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

    useEffect(() => {
        if (isSelfComplaint) {
            setComplaintBy(userID);
            setwingroomno(userID);
        }
    }, [isSelfComplaint, userID]);

    const handleComplaintByIDKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            const id = complaintByID.trim();
            if (id) {
                await setwingroomno(id);
            }
        }
    };

    const handleComplaintByIDChange = (e) => {
        setComplaintByID(e.target.value);
        setComplaintBy("");
        setWing("");
        setRoomNumber("");
    };

    const handleCheckboxChange = () => {
        setIsSelfComplaint(!isSelfComplaint);
        if (!isSelfComplaint) {
            setComplaintBy("");
            setWing("");
            setRoomNumber("");
            setComplaintByID("");
        } else {
            setComplaintByID("");
            setComplaintBy(userID);
            setwingroomno(userID);
        }
    };

    const gettimestamp = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + 330); // Adjust to IST (+5:30)
        let isoString = now.toISOString();
        isoString = isoString.replace('Z', '+05:30'); // Replace Z with +05:30 for IST
        return isoString;
    };

    return (
        <div className="new-complaint">
            {isDataLoaded ? (
                <form className="complaint-form" onSubmit={handleSubmit}>
                    {!isSelfComplaint && (
                        <div className="form-group">
                            <label className="form-label">Complaint By ID:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={complaintByID}
                                onKeyDown={handleComplaintByIDKeyDown}
                                onChange={handleComplaintByIDChange}
                                placeholder="Enter Complaint By ID"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">Complaint By:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={complaintBy}
                            onChange={(e) => setComplaintBy(e.target.value)}
                            readOnly
                            required
                        />
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isSelfComplaint}
                                onChange={handleCheckboxChange}
                            />
                            Complaint for self
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Complaint Description:</label>
                        <textarea
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Wing:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={wing}
                            onChange={(e) => setWing(e.target.value)}
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Room Number:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Working Group:</label>
                        <select
                            className="form-input"
                            value={workingGroup}
                            onChange={(e) => setWorkingGroup(e.target.value)}
                            required
                        >
                            <option value="">Select a working group</option>
                            {workingGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`submit-button ${complaintBy === "No Student" ? 'button-error' : ''}`}
                        disabled={complaintBy === "No Student"}
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default NewComplaint;
