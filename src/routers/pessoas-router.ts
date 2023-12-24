
import express,{ Request, Response, NextFunction } from 'express';
import pessoaController from '../controllers/pessoas-controller';

const router = express.Router();

/*router.get('/teste', (req:Request, res:Response) =>{    
    res.json({id:1})
});*/

router.get('/', pessoaController.getPessoas);
router.get('/:id', pessoaController.getPessoa);
router.get('/foto/:id', pessoaController.getFoto);
router.post('/importa', pessoaController.importaContato);

router.post('/', pessoaController.createPessoas);
router.put('/:id', pessoaController.updatePessoas);
router.delete('/:id', pessoaController.deletePessoas);




export default router;