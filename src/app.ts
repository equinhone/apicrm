//process.env.TZ = 'America/Cuiaba'

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Import Rotas
import pessoasRouter from './routers/pessoas-router';
import geralRouter from './routers/geral-router';
import ticketsRouter from './routers/ticket-router';
import municipiosRouter from './routers/municipios-router';

const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());    

app.use('/pessoas', pessoasRouter);
app.use('/geral',geralRouter);
app.use('/tickets',ticketsRouter);
app.use('/municipios',municipiosRouter);

/*app.use('/',(req: Request, res: Response, next: NextFunction) => {
    res.send("API 1.0.0 CRMAME");
});*/
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;