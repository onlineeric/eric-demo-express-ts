import { Router, Request, Response } from "express";
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Simple get response' });
});

router.get('/:id', (req: Request, res: Response) => {
  res.send({ message: `Simple get response with id: ${req.params.id}` });
});

router.post('', (req: Request, res: Response) => {
  res.send({ message: 'Simple post response', body: req.body });
});

router.put('/:id', (req: Request, res: Response) => {
  res.send({ message: `Simple put response with id: ${req.params.id}`, body: req.body });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send({ message: `Simple delete response with id: ${req.params.id}` });
});

export default router;