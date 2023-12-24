import express from 'express';
import defaultController from './mensagem-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/mensagem', defaultController.getMensagemAll);
router.post('/', defaultController.getMensagemWpp);


export default router;