import { Request, Response } from 'express';
import crypto from 'crypto';
import BenchmarkCls from '../utils/benchmarkCls';

export function handleSha256Request(req: Request, res: Response) {
	const loopCount = parseInt(req.params.execTimes) || 1000;
	const HASH_ALGORITHM = 'sha256';

	const benchmarkCls = new BenchmarkCls(HASH_ALGORITHM);

	benchmarkCls.startBenchmarking();

	// Execute Benchmark
	for (let i = 0; i < loopCount; i++) {
		const sha256 = crypto.createHash(HASH_ALGORITHM);
		sha256.update(benchmarkCls.testData);
		sha256.digest();
	}

	benchmarkCls.calcBenchmarking();

	// Send Response
	res.send({ message: benchmarkCls.result });
}

export function handleMd5Request(req: Request, res: Response) {
	res.send({ message: `Md5 Execute times: ${req.params.execTimes}` });
}