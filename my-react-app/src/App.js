// App.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import LoginForm from './LoginForm';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('SearchStudent');
  const [userType, setUserType] = useState(null);
  const [userID,setUserID] = useState("");
  const [userName,setUserName] = useState("");

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.Status === "True"){
          setUserType(data.userType);
          setUserID(data.id);
          setUserName(data.name);
        }
        else {
          alert("Wrong id or password");
          return;
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      {!userType ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <Header />
          <Sidebar userType={userType} setActiveComponent={setActiveComponent} username = {userName}/>
          <MainContent userType={userType} activeComponent={activeComponent} userID={userID} />
        </>
      )}
    </div>
  );
};

export default App;
