import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DungeonDecoder } from './services/decoder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👇 RUTA CORRECTA (sube un nivel)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API
app.post('/decode', (req, res) => {
  try {
    const hex = req.body.hex;
    console.log(hex);
    if (!hex) {
      return res.status(400).json({ error: 'HEX vacío' });
    }

    const bosses = DungeonDecoder.decode(hex);
    console.log(bosses);
    res.json(bosses);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor online en puerto', PORT);
});
