
import express,{ Request, Response, NextFunction } from 'express';
import defaultController from '../controllers/ticket-controller';

const router = express.Router();

router.get('/', defaultController.getTickets);
router.get('/atendimentos/', defaultController.getTicketsAtendimento);
router.get('/espera/', defaultController.getTicketsEspera);
router.get('/novo/', defaultController.getNovoTicketsEspera);
router.get('/:id', defaultController.getTicket);

router.post('/', defaultController.createTicket);
router.post('/iniciar/:id', defaultController.iniciarAtendimentoTicket);
router.post('/encerrar/:id', defaultController.encerrartendimentoTicket);

router.put('/:id', defaultController.updateTicket);
router.delete('/:id', defaultController.deleteTicket);

export default router;