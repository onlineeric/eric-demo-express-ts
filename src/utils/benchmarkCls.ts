import seedrandom from "seedrandom";
import IBenchmarkResult from "./IBenchmarkResult";
import { v4 as uuidv4 } from "uuid";

class BenchmarkCls {
	private hashAlgorithm: string;
	private testData: Buffer;
	private result: IBenchmarkResult | null = null;

	// Benchmarking starting data
	private startCpu: NodeJS.CpuUsage | null = null;
	private startMemory: number = 0;
	private startTime: [number, number] | null = null;

	constructor(hashAlgorithm: string, dataLength: number = 10000000, seed: number = 28) {
		if (dataLength <= 0) {
			throw new Error("Data length must be greater than 0");
		}

		this.hashAlgorithm = hashAlgorithm;
		this.testData = Buffer.alloc(dataLength);
		const random = seedrandom(seed.toString());
			for (let i = 0; i < dataLength; i++) {
			this.testData[i] = Math.floor(random() * 256);
		}
	}

	getTestData(): Buffer {
		return this.testData;
	}

	// recalling startBenchmarking() is allowed to reset the benchmarking data
	startBenchmarking() {
		this.result = null;		
		this.startCpu = process.cpuUsage();
		this.startMemory = process.memoryUsage().heapUsed;
		this.startTime = process.hrtime();
	}

	// call this method to calculate the benchmarking result at this moment, allow multiple calls based on the same startBenchmarking() data
	calcBenchmarking() {
		if (!this.startTime || !this.startCpu) {
			return; // Benchmarking not started, do nothing
		}
		const endTime = process.hrtime(this.startTime);
		const endCpu = process.cpuUsage(this.startCpu);
		const endMemory = process.memoryUsage().heapUsed;

		this.result = {
			server: "Express Server",
			id: uuidv4(),
			algorithm: this.hashAlgorithm,
			parallelization: false,
			cpuTime: (endCpu.user + endCpu.system) / 1000, // Convert to milliseconds
			memoryUsed: endMemory - this.startMemory,
			executionTime: endTime[0] * 1000 + endTime[1] / 1e6, // Convert to milliseconds
			finishedTime: new Date()
		};
	}

	resetBenchmarking() {
		this.result = null;
		this.startCpu = null;
		this.startMemory = 0;
		this.startTime = null;
	}

	getResult(): IBenchmarkResult | null {
		return this.result;
	}
}

export default BenchmarkCls;