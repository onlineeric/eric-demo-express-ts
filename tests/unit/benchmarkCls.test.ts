import BenchmarkCls from '../../src/utils/benchmarkCls';

describe('BenchmarkCls', () => {
	test('constructor initializes correctly with valid parameters', () => {
		const benchmark = new BenchmarkCls('sha256', 100, 42);
		expect(benchmark.getTestData().length).toBe(100);
		expect(benchmark.getResult()).toBeNull();
	});

	test('constructor throws error with non-positive dataLength', () => {
		expect(() => new BenchmarkCls('sha256', 0, 42)).toThrow('Data length must be greater than 0');
	});

	test('getTestData returns the correct buffer length', () => {
		const dataLength = 100;
		const benchmark = new BenchmarkCls('sha256', dataLength, 42);
		const testData = benchmark.getTestData();
		expect(testData.length).toBe(dataLength);
	});

	test('startBenchmarking initializes benchmarking data', () => {
		const benchmark = new BenchmarkCls('sha256', 100, 42);
		benchmark.startBenchmarking();
		const result = benchmark.getResult();
		expect(result).toBeNull();
	});

	test('calcBenchmarking updates the result correctly', () => {
		const benchmark = new BenchmarkCls('sha256', 100, 42);
		benchmark.startBenchmarking();
		benchmark.calcBenchmarking();
		const result = benchmark.getResult();
		expect(result).not.toBeNull();
		expect(result?.Algorithm).toBe('sha256');
		expect(result?.CpuTime).toBeGreaterThanOrEqual(0);
		expect(result?.MemoryUsed).toBeGreaterThanOrEqual(0);
		expect(result?.ExecutionTime).toBeGreaterThanOrEqual(0);
		expect(result?.FinishedTime).toBeInstanceOf(Date);
	});

	test('resetBenchmarking clears the benchmarking data', () => {
		const benchmark = new BenchmarkCls('sha256', 100, 42);
		benchmark.startBenchmarking();
		benchmark.calcBenchmarking();
		benchmark.resetBenchmarking();
		const result = benchmark.getResult();
		expect(result).toBeNull();
	});
});