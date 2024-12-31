import { getLangChainResponse } from "./langChainQueries";

const langChainResolvers = {
	Query: {
		getLangChainResponse: getLangChainResponse,
	}
};

export default langChainResolvers;
