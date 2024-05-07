import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, AppBar, Toolbar } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
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
          <Button color="inherit" href="/login">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main Search Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Find Your Favorite Music
        </Typography>
        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 600 }}>
          <TextField
            variant="outlined"
            placeholder="Search for music, artists, genres..."
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Search
          </Button>
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

export default Home;
