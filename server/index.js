import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

app.get('/config', (req, res) => {
  res.json({
    AMPLITUDE_KEY: process.env.AMPLITUDE_KEY,
    MIXPANEL_KEY: process.env.MIXPANEL_KEY,
    HEAP_DEV_KEY: process.env.HEAP_DEV_KEY,
    HEAP_PROD_KEY: process.env.HEAP_PROD_KEY,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
