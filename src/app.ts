import express, { Application, Request, Response } from "express";
import cors from "cors";
import basicAuth from "./middlewares/basicAuth";
import simpleRouter from "./routes/simpleRouter";
import benchmarkRouter from "./routes/benchmarkRouter";

// import package.json and read the version
import { version as appVersion } from '../package.json';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON requests

// Unprotected Routes (No Auth Required)
app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, TypeScript with Express! Version: ${appVersion}`);
});

// Protected Routes from here (Auth Required)
app.use(basicAuth);

app.use('/simple', simpleRouter);

app.use('/benchmark', benchmarkRouter);

export default app;
