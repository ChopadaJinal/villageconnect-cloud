// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // serve static files like app.js and style.css

// POST endpoint for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy user check (replace with database logic)
  if (username === 'admin' && password === '1234') {
    return res.status(200).send('✅ Login successful!');
  } else {
    return res.status(401).send('❌ Invalid username or password');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
