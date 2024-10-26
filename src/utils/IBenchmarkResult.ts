interface IBenchmarkResult {
	Algorithm: string;
	CpuTime: number;
	MemoryUsed: number;
	ExecutionTime: number;
	FinishedTime: Date | null;
}

export default IBenchmarkResult;