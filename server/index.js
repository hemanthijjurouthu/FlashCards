const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyparser.json());

// Directly using hardcoded MySQL credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ram@1234#',
  database: 'flashcards',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
