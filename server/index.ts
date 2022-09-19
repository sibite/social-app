import express from 'express';

const PORT = 4000;

const app = express();

app.get('/api', (req, res) => {
  res.send('{"title":"Welcome"}');
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
