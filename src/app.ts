import express, { Application, Request, Response } from "express";
import basicAuth from "./middlewares/basicAuth";
import simpleRouter from "./routes/simpleRouter";

// import package.json and read the version
import { version as appVersion } from '../package.json';

const app: Application = express();

// Middleware
app.use(express.json()); // To handle JSON requests

// Unprotected Routes (No Auth Required)
app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, TypeScript with Express! Version: ${appVersion}`);
});

// Protected Routes from here (Auth Required)
app.use(basicAuth);

app.use('/simple', simpleRouter);

export default app;
