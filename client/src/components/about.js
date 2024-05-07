import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/api'; 
import { logOut } from '../firebaseConfig';

const About = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        console.log('No token found, redirecting to login');
        logOut().then(() => navigate('/'));
        return;
      }

      try {
        setLoading(true);
        const response = await getUserDetails(token);
        console.log('API Response:', response); // Debug: Check API response
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please log in again.');
        logOut().then(() => {
          navigate('/');
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserDetails(); // Only fetch if token exists
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="about-container">
      <header className="nav-bar">
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </nav>
      </header>

      <main className="user-details">
        <h1>User Details</h1>
        {loading && <p>Loading user details...</p>}
        {error && <p className="error-message">{error}</p>}
        {user && !loading && !error && (
          <>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        )}
      </main>

      <footer>
        <p>Powered by Firebase Authentication</p>
      </footer>
    </div>
  );
};

export default About;
