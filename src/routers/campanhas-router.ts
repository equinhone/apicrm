
import express,{ Request, Response, NextFunction } from 'express';
import controller from '../controllers/campanhas-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/', controller.getAll);
router.get('/:id', controller.getId);
router.post('/', controller.create);
router.put('/:id', controller.updateId);
router.delete('/:id', controller.deleteId);

router.get('/pessoas/:id', controller.getAllPessoas);
router.post('/pessoas', controller.createChild);
router.delete('/pessoas/:campanha/:pessoa', controller.deletePessoa);


export default router;