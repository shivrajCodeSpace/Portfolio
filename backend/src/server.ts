import express, { Request, Response } from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
