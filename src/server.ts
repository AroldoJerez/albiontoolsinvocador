import express from 'express';
import path from 'path';
import { DungeonDecoder } from './services/decoder.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la web
app.use(express.static(path.join(__dirname, 'public')));

// API
app.post('/decode', (req, res) => {
  try {
    const hex = req.body.hex;
    if (!hex) {
      return res.status(400).json({ error: 'HEX vacío' });
    }

    const bosses = DungeonDecoder.decode(hex);
    res.json(bosses);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor online en puerto', PORT);
});
