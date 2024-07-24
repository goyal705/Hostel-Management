import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveComponent, userType , username}) => {
  const [isComplaintDropdownOpen, setIsComplaintDropdownOpen] = useState(false);

  const toggleComplaintDropdown = () => {
    setIsComplaintDropdownOpen(!isComplaintDropdownOpen);
  };

  return (
    <div className="sidebar">
      <div className="username">Welcome {username}</div>
      <div className="amenities">Amenities</div>
      {userType === 'admin' && (
        <>
          <button onClick={() => setActiveComponent('SearchStudent')} className='button-sidebar'>Search Students</button>
          <button onClick={() => setActiveComponent('AllStudents')} className='button-sidebar'>All Students</button>
          <button onClick={() => setActiveComponent('Complaints')} className='button-sidebar'>Complaints</button>
        </>
      )}
      {userType === 'student' && (
        <>
          <button onClick={() => setActiveComponent('SeeProfile')} className='button-sidebar'>See Profile</button>
          <button onClick={toggleComplaintDropdown} className='button-sidebar'>Complaints</button>
          {isComplaintDropdownOpen && (
            <div className="dropdown">
              <button onClick={() => setActiveComponent('NewComplaint')} className='button-dropdown'>New Complaint</button>
              <button onClick={() => setActiveComponent('CheckStatus')} className='button-dropdown'>Check Status</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
