const express = require('express');
const router = express.Router();

// Dummy search implementation
router.get('/', (req, res) => {
  const query = req.query.query || '';
  // Replace with actual search logic
  const dummyResults = [
    { id: 1, title: 'Sample Result 1', description: 'Description for result 1' },
    { id: 2, title: 'Sample Result 2', description: 'Description for result 2' },
    { id: 3, title: 'Sample Result 3', description: 'Description for result 9' },
    { id: 4, title: 'Sample Result 4', description: 'Description for result 14' },
  ];
  res.json(dummyResults.filter(result => result.title.toLowerCase().includes(query.toLowerCase())));
});

module.exports = router;
