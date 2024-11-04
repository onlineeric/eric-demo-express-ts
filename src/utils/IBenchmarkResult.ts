interface IBenchmarkResult {
	id: string;
	server: string;
	algorithm: string;
	parallelization: boolean;
	executionTime: number;
	memoryUsed: number;
	finishedTime: Date | null;
	cpuTime: number;
}

export default IBenchmarkResult;