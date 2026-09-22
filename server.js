const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

const ADMIN_PASSWORD = "fairy@2003";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/content', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/content', (req, res) => {
  const { adminPassword, ...dataToSave } = req.body;

  if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Galat Password! Changes save nahi ho sakte.' });
  }

  fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Failed to save data' });
    res.json({ message: 'Success! All changes saved.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});