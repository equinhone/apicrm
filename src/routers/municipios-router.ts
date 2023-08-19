
import express,{ Request, Response, NextFunction } from 'express';
import defaultController from '../controllers/municipios-controller';

const router = express.Router();

router.get('/', defaultController.getMunicipios);
router.get('/uf/:uf', defaultController.getMunicipiosUF);
router.get('/uf/', defaultController.getUF);
//router.post('/', defaultController.createTicket);
//router.put('/:id', defaultController.updateTicket);
//router.delete('/:id', defaultController.deleteTicket);

export default router;