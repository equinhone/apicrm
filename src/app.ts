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
import cadmensagemRouter from './routers/cadmensagem-router';
import cadmensagemcategoriaRouter from './routers/cadmensagem-categoria-router';
import wpp_mensagemRouter from './routers/wapp_mensagem-router';
import wpp_keyRouter from './routers/wapp_key-router';



//Import Serviços
import mensagemService from './services/mensagem-controller'
import mensagemServiceRouter from './services/mensagem-router'

import { now } from 'moment-timezone';
import { ImportaContatosJson } from './lib/ImportaContatosJson';

const app = express();

var bodyParser = require('body-parser');

var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);


app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());    

app.use('/pessoas', pessoasRouter);
app.use('/geral',geralRouter);
app.use('/tickets',ticketsRouter);
app.use('/municipios',municipiosRouter);
app.use('/cadmensagem',cadmensagemRouter);
app.use('/cadmensagemcategoria',cadmensagemcategoriaRouter);
app.use('/wppmensagem',wpp_mensagemRouter);
app.use('/wppkey',wpp_keyRouter);
app.use('/service',mensagemServiceRouter);

CriaDiretorios();

//console.log('Isto aqui vai ser executado a cada 5 minutos'+ ; 
/*setInterval(function () { 
    console.log('Isto aqui vai ser executado a cada 5 minutos'); 
    const res = await mensagemService.getMensagemAll
}, 1 * 60 * 1000); //300.000, o que corresponde a 5 minutos*/

/*app.use('/',(req: Request, res: Response, next: NextFunction) => {
    res.send("API 1.0.0 CRMAME");
});*/


//setInterval(VerificarMensagem, 1 * 5 * 3000);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;


function VerificarMensagem(){
    var segundos = 1;
    const verificaMensagem = mensagemService.getMensagem2()
}

function CriaDiretorios(){
    const fs = require("fs");                    
    
    if (!fs.existsSync('./dist')){
        fs.mkdirSync('./dist');
    }

    if (!fs.existsSync('./dist/temp')){
        fs.mkdirSync('./dist/temp');
    }                

    if (!fs.existsSync('./dist/temp/contato')){
        fs.mkdirSync('./dist/temp/contato');
    } 

    if (!fs.existsSync('./dist/temp/msgs')){
        fs.mkdirSync('./dist/temp/msgs');
    } 

    if (!fs.existsSync('./dist/temp/chats')){
        fs.mkdirSync('./dist/temp/chats');
    } 
    
    var dirImage = './dist/temp/image/';
    var dirDoc = './dist/temp/doc/';
    var dirVideo = './dist/temp/video/';
    var dirAudio = './dist/temp/audio/';

    if (!fs.existsSync(dirImage)){
        fs.mkdirSync(dirImage);
    }

    if (!fs.existsSync(dirDoc)){
        fs.mkdirSync(dirDoc);
    }

    if (!fs.existsSync(dirVideo)){
        fs.mkdirSync(dirVideo);
    }

    if (!fs.existsSync(dirAudio)){
        fs.mkdirSync(dirAudio);
    }






}



