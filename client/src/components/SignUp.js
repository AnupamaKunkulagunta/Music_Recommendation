import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { signInWithGoogle, signUpWithEmail } from '../firebaseConfig'; // Ensure signUpWithEmail is defined

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your sign up function here
      await signUpWithEmail(formData.email, formData.password, formData.username);
      console.log('Sign up successful');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle(); // Sign in with Google function
      console.log('Google sign up successful');
    } catch (error) {
      console.error('Google sign up error:', error);
    }
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
          <Button color="inherit" href="/login">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Centered Signup Box */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGoogleSignUp}
                  fullWidth
                >
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      <Box textAlign="center" p={2}>
        <Typography variant="body2" color="textSecondary">
          Powered by Firebase Authentication
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
