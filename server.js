const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

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
    fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update data' });
        res.json({ message: 'All changes saved successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`);
});
app.post('/api/content', (req, res) => {
  const { adminPassword, ...dataToSave } = req.body;
  
  const SECRET_KEY = "fairy@2003"; 

  if (adminPassword !== SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized: Incorrect Password" });
  }

  fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update data' });
    res.json({ message: 'Saved successfully!' });
  });
});