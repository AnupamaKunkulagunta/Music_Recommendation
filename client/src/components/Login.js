import React, { useState } from 'react';
import { signInWithGoogle, logOut, auth, loginWithEmail } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, TextField, Avatar, Typography, Box, Container, Alert } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const idToken = await currentUser.getIdToken();
          navigate('/home');
        } catch (error) {
          setError('Failed to get ID token.');
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google.');
      clearErrorAfterDelay();
    }
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      setError(null);
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
      clearErrorAfterDelay();
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out.');
    }
  };

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Full-Width AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music Recommendation
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/about">About</Button>
          <Button color="inherit" href="/signup">SignUp</Button>
        </Toolbar>
      </AppBar>

      {/* Centered Login Box */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom align="center">
            {user ? `Welcome, ${user.displayName}` : 'Login to Your Account'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          
          <Box mt={3} textAlign="center">
            {user ? (
              <>
                <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Email login */}
                <Box>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleEmailLogin}
                  >
                    Login with Email
                  </Button>
                </Box>
                <Typography variant="body1" sx={{ my: 2 }}>or</Typography>
                {/* Google login */}
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  onClick={handleLogin}
                >
                  Login with Google
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      <Box textAlign="center" p={2}>
        <Typography variant="body2" color="textSecondary">
          Powered by Firebase Authentication
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
