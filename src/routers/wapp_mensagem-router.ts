
import express,{ Request, Response, NextFunction } from 'express';
import defaultController from '../controllers/wapp_mensagem-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/', defaultController.getAll);
router.get('/:id', defaultController.getId);
router.post('/', defaultController.create);
router.put('/:id', defaultController.updateId);
router.delete('/:id', defaultController.deleteId);
router.get('/mensagem/:id/:ticket/:opcao', defaultController.getMensagemChat);
router.get('/all/:filter', defaultController.getAllFilter);

export default router;