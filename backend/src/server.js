const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
