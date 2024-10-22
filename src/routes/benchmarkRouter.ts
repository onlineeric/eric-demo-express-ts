import { Router } from "express";
import { handleMd5Request, handleSha256Request } from "../requestHandler/benchmarkHandler";

const router = Router();

router.get('/Sha256/:execTimes', handleSha256Request);

router.get('/Md5/:execTimes', handleMd5Request);

export default router;