/*  ********** THIS COMPONENT IS NOT USED AS COMPONENT IN THE PROJECT ***************
    **********  TO GET THE HEADER WORKING PROPERLY THIS CODE IS COPIED THERE *** */
// This component is used to check if a user is logged in and display the appropriate links
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthComponent = () => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  // Check localStorage when the component mounts
  useEffect(() => {
    console.log('checking local storage');
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);

  // Logout function to clear localStorage and reset user state
  const handleLogout =async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      Navigate('/login');
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {user ? (
        [
          <Link to='/profile'>Profile</Link>,
          <button onClick={handleLogout}>Logout</button>
        ]
      ) : (
        [
          <Link to='/getstarted'>Get Started</Link>
        ]
      )}
    </>
  );
};

export default AuthComponent;