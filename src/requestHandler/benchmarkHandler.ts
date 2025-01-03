import { Request, Response } from 'express';
import crypto from 'crypto';
import BenchmarkCls from '../utils/benchmarkCls';

export function handleSha256Request(req: Request, res: Response) {
	const loopCount = parseInt(req.params.execTimes) || 1000;
	const HASH_ALGORITHM = 'SHA256';

	const benchmarkCls = new BenchmarkCls(HASH_ALGORITHM);

	benchmarkCls.startBenchmarking();

	// Execute Benchmark
	for (let i = 0; i < loopCount; i++) {
		const sha256 = crypto.createHash(HASH_ALGORITHM);
		sha256.update(benchmarkCls.getTestData());
		sha256.digest();
	}

	benchmarkCls.calcBenchmarking();

	// Send Response
	res.send(benchmarkCls.getResult());
}

export function handleMd5Request(req: Request, res: Response) {
	const loopCount = parseInt(req.params.execTimes) || 1000;
	const HASH_ALGORITHM = 'MD5';

	const benchmarkCls = new BenchmarkCls(HASH_ALGORITHM);

	benchmarkCls.startBenchmarking();

	// Execute Benchmark
	for (let i = 0; i < loopCount; i++) {
		const md5 = crypto.createHash(HASH_ALGORITHM);
		md5.update(benchmarkCls.getTestData());
		md5.digest();
	}

	benchmarkCls.calcBenchmarking();

	// Send Response
	res.send(benchmarkCls.getResult());
}