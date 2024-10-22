import { Request, Response } from 'express';
import crypto from 'crypto';
import seedrandom from 'seedrandom';

export function handleSha256Request(req: Request, res: Response) {
    const loopCount = parseInt(req.params.execTimes) || 1000;

    // Initialize Benchmarking
    const startCpu = process.cpuUsage();
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime();

    // Prepare Data
    const dataLength = 10000000;
    const seed = 28;
    const data = Buffer.alloc(dataLength);
    const random = seedrandom(seed.toString());
    for (let i = 0; i < dataLength; i++) {
        data[i] = Math.floor(random() * 256);
    }

    // Execute Benchmark
    for (let i = 0; i < loopCount; i++) {
        const sha256 = crypto.createHash('sha256');
        sha256.update(data);
        sha256.digest();
    }

    // Stop Benchmarking
    const endTime = process.hrtime(startTime);
    const endCpu = process.cpuUsage(startCpu);
    const endMemory = process.memoryUsage().heapUsed;

    // Calculate Results
    const cpuTime = (endCpu.user + endCpu.system) / 1000; // Convert to milliseconds
    const memoryUsed = endMemory - startMemory;
    const executionTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    const finishedTime = new Date();

    // Prepare Result
    const result = {
        Algorithm: "SHA256",
        CpuTime: cpuTime,
        MemoryUsed: memoryUsed,
        ExecutionTime: executionTime,
        FinishedTime: finishedTime
    };

    // Send Response
    res.send({ message: result });}

export function handleMd5Request(req: Request, res: Response) {
	res.send({ message: `Md5 Execute times: ${req.params.execTimes}` });
}