const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const ConnectDB = require('./Database');
const userRoutes = require('./routes');

dotenv.config();
ConnectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/extensions', express.static(path.join(__dirname, 'Extensions')));

app.use('/api/users', userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'), (err) => {
    if (err) res.status(500).send('Error loading frontend');
  });
});

app.listen(5000, () => console.log('Server is running on port 5000'));
