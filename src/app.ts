import express, { Application, Request, Response } from "express";
import cors from "cors";
import basicAuth from "./middlewares/basicAuth";
import simpleRouter from "./routes/simpleRouter";
import benchmarkRouter from "./routes/benchmarkRouter";
import { ApolloServer } from "apollo-server-express";
import { myResolvers, myTypeDefs } from "./graphQL/apolloServerLib";

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
app.get('/status', (req: Request, res: Response) => {
	res.send(`Version ${appVersion} is running`);
});

// Protected Routes from here (Auth Required)
app.use(basicAuth);

app.use('/simple', simpleRouter);

app.use('/benchmark', benchmarkRouter);

// Create Apollo Server
const apolloServer = new ApolloServer({ typeDefs: myTypeDefs, resolvers: myResolvers });

// Apply middleware to the app
apolloServer.start().then(() => {
	apolloServer.applyMiddleware({ app, path: "/graphQL" });
});

export default app;
