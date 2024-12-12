const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const path = require('path');
const ConnectDB = require('./Database');

dotenv.config();
ConnectDB();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/extensions', express.static(path.join(__dirname, 'Extensions')));

app.use('/api/users', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(5000, () => {
    console.log('Server started listening at port 5000');
});
