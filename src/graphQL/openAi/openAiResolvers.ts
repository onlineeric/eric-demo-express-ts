import { initOpenAi } from "./openAiMutations";

const openAiResolvers = {
	Mutation: {
		initOpenAi: initOpenAi,
	}
};

export default openAiResolvers;
