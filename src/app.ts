import express, { Application, Request, Response } from "express";
import cors from "cors";
import basicAuth from "./middlewares/basicAuth";
import simpleRouter from "./routes/simpleRouter";
import benchmarkRouter from "./routes/benchmarkRouter";
import { ApolloServer, gql } from "apollo-server-express";

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



// endpoint '/simpleGraphQL' to return a list of users using GraphQL
// GraphQL type definitions and resolvers
const typeDefs = gql`
	type Item {
		id: ID!
		name: String!
	}

	type Query {
		getItem(id: ID!): Item
		getItems: [Item]
	}

	type Mutation {
		createItem(name: String!): Item
		updateItem(id: ID!, name: String!): Item
		deleteItem(id: ID!): String
	}
`;

let items = [
	{ id: "1", name: "Item 1" },
	{ id: "2", name: "Item 2" },
];

const resolvers = {
	Query: {
		getItem: (_: any, { id }: { id: string }) => items.find((item) => item.id === id),
		getItems: () => items,
	},
	Mutation: {
		createItem: (_: any, { name }: { name: string }) => {
			const newItem = { id: `${items.length + 1}`, name };
			items.push(newItem);
			return newItem;
		},
		updateItem: (_: any, { id, name }: { id: string; name: string }) => {
			const item = items.find((item) => item.id === id);
			if (item) {
				item.name = name;
				return item;
			}
			throw new Error("Item not found");
		},
		deleteItem: (_: any, { id }: { id: string }) => {
			const index = items.findIndex((item) => item.id === id);
			if (index !== -1) {
				items.splice(index, 1);
				return `Item with id ${id} deleted`;
			}
			throw new Error("Item not found");
		},
	},
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware to the app
server.start().then(() => {
	server.applyMiddleware({ app, path: "/simpleGraphQL" });
});




export default app;
