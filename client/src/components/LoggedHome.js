import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { logOut } from '../firebaseConfig';
const LoggedInHome = ({ user }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music Recommendation
          </Typography>
          <Button color="inherit" href="/home">Home</Button>
          <Button color="inherit" href="/about">About</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Search Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Music Recommendation
        </Typography>
        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 600 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search for music, artists, genres..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: 1 }}
            />
            <IconButton type="submit" color="primary">
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </Box>

      {/* Footer */}
      <Box textAlign="center" p={2} bgcolor="#f1f1f1">
        <Typography variant="body2" color="textSecondary">
          Powered by Music API
        </Typography>
      </Box>
    </Box>
  );
};

export default LoggedInHome;
