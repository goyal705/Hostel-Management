// MainContent.js
import React from 'react';
import SearchStudent from './Components/SearchStudent';
import AllStudents from './Components/AllStudents';
import Complaints from './Components/Complaints';
import SeeProfile from './Components/SeeProfile';
import NewComplaint from './Components/NewComplaint';

const MainContent = ({ userType, activeComponent, userID }) => {
  return (
    <div style={styles.mainContent}>
      {userType === 'admin' ? (
        <>
          {activeComponent === 'SearchStudent' && <SearchStudent />}
          {activeComponent === 'AllStudents' && <AllStudents />}
          {activeComponent === 'Complaints' && <Complaints />}
        </>
      ) : (
        <>
          {/* {activeComponent === 'UserPage1' && <UserPage1 />}
          {activeComponent === 'UserPage2' && <UserPage2 />} */}
        </>
      )}
      {userType === 'student' ? (
        <>
          {activeComponent === 'SeeProfile' && <SeeProfile userID = {userID} />}
          {activeComponent === 'NewComplaint' && <NewComplaint userID = {userID}/>}
        </>
      ) : (
        <>
          {/* {activeComponent === 'UserPage1' && <UserPage1 />}
          {activeComponent === 'UserPage2' && <UserPage2 />} */}
        </>
      )}
    </div>
  );
};

const styles = {
  mainContent: {
    marginLeft: '15%', // sidebar width
    marginTop:"10px",
    padding: '10px',
    boxSizing: 'border-box',
  },
};

export default MainContent;
