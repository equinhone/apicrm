
import express,{ Request, Response, NextFunction } from 'express';
import cadmensagemController from '../controllers/cadmensagem-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/', cadmensagemController.getAll);
router.get('/:id', cadmensagemController.getId);
router.get('/imagem/:id', cadmensagemController.getImagemId);

router.post('/', cadmensagemController.create);
router.put('/:id', cadmensagemController.updateId);
router.delete('/:id', cadmensagemController.deleteId);


export default router;