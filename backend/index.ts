import express from 'express';
import fs from 'fs';
import readline from 'readline';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const sqlFilePath = path.join(__dirname, '..', 'data.sql');

app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Paramètre q requis' });
  }
  const results: string[] = [];
  const stream = fs.createReadStream(sqlFilePath, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes(query)) {
      results.push(line);
      if (results.length >= 100) break;
    }
  }

  rl.close();
  stream.close();
  return res.json(results);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});