import { Router, Request, Response } from "express";
const router = Router();

router.get('/Sha256/:execTimes', (req: Request, res: Response) => {
	res.send({ message: `Sha256 Exercute times: ${req.params.execTimes}` });
});

router.get('/Md5/:execTimes', (req: Request, res: Response) => {
	res.send({ message: `Md5 Exercute times: ${req.params.execTimes}` });
});

export default router;