import { initOpenAi } from "./openAiQueries";

const openAiResolvers = {
	Query: {
		initOpenAi: initOpenAi,
	}
};

export default openAiResolvers;
