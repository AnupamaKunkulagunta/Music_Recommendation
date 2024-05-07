import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { search } from '../api/api';
import { AppBar, Toolbar, Button, Typography, Box, TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import the search icon

const SearchPage = () => {
  const [user, setUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setSearchQuery(query);
      search(query)
        .then(response => setSearchResults(response.data))
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Full-Width AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music Recommendation
          </Typography>
          <Button color="inherit" href="/home">Home</Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" href="/login">Login</Button>
          )}
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
        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 600, marginBottom: 16 }}>
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

        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        
        <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {searchResults.length > 0 ? (
            <List>
              {searchResults.map(result => (
                <ListItem key={result.id}>
                  <ListItemText 
                    primary={result.title} 
                    secondary={result.description} 
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No results found.</Typography>
          )}
        </Box>
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

export default SearchPage;
