
import express,{ Request, Response, NextFunction } from 'express';
import controller from '../controllers/campanhas-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/', controller.getAll);
router.get('/pessoas/:id', controller.getAllPessoas);

router.get('/:id', controller.getId);
router.post('/', controller.create);
router.post('/pessoa', controller.createChild);
router.put('/:id', controller.updateId);
router.delete('/:id', controller.deleteId);
router.delete('/pessoa/:campanha/:pessoa', controller.deletePessoa);


export default router;