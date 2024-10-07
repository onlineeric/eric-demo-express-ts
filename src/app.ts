import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware
app.use(express.json()); // To handle JSON requests

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

export default app;
