import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import LoggedInHome from './components/LoggedHome';
import About from './components/about';
import SearchPage from './components/SearchPage';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignupPage from './components/SignUp';

// Create a custom theme if needed
const theme = createTheme();

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login"  element={user ? <LoggedInHome user={user}/> : <Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={user ? <LoggedInHome user={user} /> : <Login />} />
          <Route path="/about" element={user ? <About user={user} /> : <Login />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
