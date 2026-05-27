require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const JUDGE0_URL = `https://${process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com'}/submissions?base64_encoded=true&wait=true`;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.post('/api/run', async (req, res) => {
  const { code, languageId, stdin = '' } = req.body;

  if (!code || !languageId) {
    return res.status(400).json({ error: 'code and languageId are required' });
  }

  if (!process.env.JUDGE0_API_KEY) {
    return res.status(500).json({ error: 'Server is missing JUDGE0_API_KEY — add it to server/.env' });
  }

  try {
    const response = await axios.post(
      JUDGE0_URL,
      {
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: stdin ? Buffer.from(stdin).toString('base64') : '',
      },
      {
        headers: {
          'X-RapidAPI-Key':  process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );

    const d = response.data;
    const decode = (val) => (val ? Buffer.from(val, 'base64').toString() : '');

    return res.json({
      stdout:         decode(d.stdout),
      stderr:         decode(d.stderr),
      compile_output: decode(d.compile_output),
      status:         d.status,
      time:           d.time,
      memory:         d.memory,
    });
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Unknown error';
    return res.status(500).json({ error: msg });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/', (_req, res) => {
  res.send('CodeRun API server is running. Open <a href="http://localhost:5173">http://localhost:5173</a> for the app.');
});

app.listen(PORT, () => {
  console.log(`CodeRun server running on http://localhost:${PORT}`);
});
