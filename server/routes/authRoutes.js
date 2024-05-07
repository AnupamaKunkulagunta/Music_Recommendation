const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Firebase Admin SDK initialization
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = decodedToken;

    // Generate a JWT token for the client
    const jwtToken = jwt.sign({ id: user.uid, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ jwtToken, user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
