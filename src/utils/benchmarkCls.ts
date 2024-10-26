import seedrandom from "seedrandom";
import IBenchmarkResult from "./IBenchmarkResult";

class BenchmarkCls {
	hashAlgorithm: string;
	testData: Buffer;
	result: IBenchmarkResult | null = null;

	// Benchmarking starting data
	startCpu: NodeJS.CpuUsage | null = null;
	startMemory: number = 0;
	startTime: [number, number] | null = null;

	constructor(hashAlgorithm: string, dataLength: number = 10000000, seed: number = 28) {
		this.hashAlgorithm = hashAlgorithm;
		this.testData = Buffer.alloc(dataLength);
		const random = seedrandom(seed.toString());
			for (let i = 0; i < dataLength; i++) {
			this.testData[i] = Math.floor(random() * 256);
		}
	}

	startBenchmarking() {
		this.result = null;		
		this.startCpu = process.cpuUsage();
		this.startMemory = process.memoryUsage().heapUsed;
		this.startTime = process.hrtime();
	}

	calcBenchmarking() {
		if (!this.startTime || !this.startCpu) {
			return;
		}
		const endTime = process.hrtime(this.startTime);
		const endCpu = process.cpuUsage(this.startCpu);
		const endMemory = process.memoryUsage().heapUsed;

		this.result = {
			Algorithm: this.hashAlgorithm,
			CpuTime: (endCpu.user + endCpu.system) / 1000, // Convert to milliseconds
			MemoryUsed: endMemory - this.startMemory,
			ExecutionTime: endTime[0] * 1000 + endTime[1] / 1e6, // Convert to milliseconds
			FinishedTime: new Date()
		};
	}	
}

export default BenchmarkCls;