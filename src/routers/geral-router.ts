import express,{ Request, Response, NextFunction } from 'express';
import geralController from '../controllers/geral-controller';

const router = express.Router();

router.get('/', geralController.getGeral);
router.post('/', geralController.postGeral);


export default router;