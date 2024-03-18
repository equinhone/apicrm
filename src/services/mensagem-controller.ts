
import sequelizeWpp from '../db/dbwpp';
import { Op } from 'sequelize';
import { Request, Response, NextFunction, response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/db';
import { Mensagem, MensagemAttributes } from '../services/mensagem-model';
import { WappMensagem } from '../models/wapp_mensagem-model';
import { WappArquivo } from '../models/wapp_arquivo-model';
import { WappKey } from '../models/wapp_key-model'
import { Pessoa } from '../models/pessoa-model';
import util from '../lib/util'
import { Ticket } from '../models/ticket-model';
import utilTickets, {} from '../lib/util-tickets';

export const getMensagemAll = async (req: Request, res: Response) => {
//export async function getMensagemAll(req: Request, res: Response, next: NextFunction) {
    try{
        //const results = await sequelizeWpp.query(sql,{type: QueryTypes.SELECT})        

        //console.log('Executando');

        const results = await Mensagem.findAll({
            where: { readcrm:  null  },
            limit: 2,
            order:[['id','asc']]
        });
        
        
        results.forEach( 
        async (MensagemAttributes) => { 
            console.log(MensagemAttributes.id);
            
            try {
                const resultsMensagem = await WappMensagem.findAll({
                    where: { id_key: { [Op.like]: `%${ MensagemAttributes.id }%` } }
                    //limit: 2,
                    //order:[['id','asc']]
                });
                
                //console.log(resultsMensagem.dataValues);                

                for (let i = 0; i < resultsMensagem.length; i++)  {
                    console.log(resultsMensagem[i].dataValues);
                  }

                
                //res.setHeader('Content-Type', 'application/json');
                //res.status(200).json(resultsMensagem);

                /*if(resultsMensagem.length > 0){
                    res.status(200).json(resultsMensagem).setHeader('Content-Type', 'text/html');
                }else{
                    res.status(201).json({error: 'nao encontrado'})            
                } */ 
                
            } catch (error) {
                //res.status(500).json(error)
                console.log(error);
            }
        });
        
    } catch (error) {
        console.log(error);        
    }
}

export async function getMensagem() {
    
    try{
        //const results = await sequelizeWpp.query(sql,{type: QueryTypes.SELECT})        

        const results = await Mensagem.findAll({
            where: { readcrm:  null  },
            limit: 2,
            order:[['id','asc']]
        });
        
        
        results.forEach( 
        async (MensagemAttributes) => { 
            console.log(MensagemAttributes.id);
            
            try {
                const resultsMensagem = await WappMensagem.findAll({
                    where: { id_key: { [Op.like]: `%${ MensagemAttributes.id }%` } }
                    //limit: 2,
                    //order:[['id','asc']]
                });

                if (resultsMensagem.length > 0) {
                    
                    resultsMensagem.forEach( 
                        (WappMensagemAttributes) => { 
                        //console.log(WappMensagemAttributes.idKey);
                        }
                    );
                    
                    
                    /*for (let i = 0; i < resultsMensagem.length; i++)  {
                        console.log(resultsMensagem[i].dataValues);
                      }*/
                }else{
                    //let idkey = MensagemAttributes.                   
                    
                }

            } catch (error) {
                //res.status(500).json(error)
                console.log(error);                
            }
        });
        
    } catch (error) {
        console.log(error);        
    }
}

export async function getMensagem2() {
    
    try{
        let sql = 
        'SELECT mm.id, mm.body, mm.ack, mm.read, mm."mediaType", mm."mediaUrl", mm."ticketId", mm."createdAt", mm."updatedAt",  '+
        'mm."fromMe", mm."isDeleted", mm."contactId", mm."quotedMsgId", mm."companyId", mm."remoteJid", mm."dataJson",  '+
        'mm.participant, mm."queueId", mm.readcrm, cc."name" as nome, cc.number as celular, wpp.name wpp '+
        'FROM public."Messages" mm '+
        'left join public."Tickets" tc on (tc."id"=mm."ticketId") '+
        'left join public."Contacts" cc ON (cc."id" = tc."contactId") '+
        'left join public."Whatsapps" wpp ON (wpp.id = tc."whatsappId") '+
        'where mm.readcrm is null '+
        'Order by mm."createdAt" desc '+
        'Limit 5 ';        
        
        const results = await sequelizeWpp.query(sql,{type: QueryTypes.SELECT})        

        /*const results = await Mensagem.findAll({
            where: { readcrm:  null  },
            limit: 2,
            order:[['id','asc']]
        });*/

        if (results.length > 0) { 
            for (let i = 0; i < results.length; i++)  {                
                
                const itemMensagem = results[i] as MensagemAttributes; 
                
                //console.log(itemMensagem.fromMe)
                
                let lIdKey = itemMensagem.fromMe+'_'+itemMensagem.celular+'@c.us_'+itemMensagem.id;                                
                
                console.log(lIdKey)

                const resultsMensagem = await WappMensagem.findAll({
                    where: { id_key: { [Op.like]: `%${ lIdKey }%` } },
                    limit: 1
                    //order:[['id','asc']]
                });

                if (resultsMensagem.length > 0) {
                    const updateMensagem = await Mensagem.findByPk(itemMensagem.id);
    
                    if(updateMensagem){
                        updateMensagem.readcrm = '1';
                        await updateMensagem.save();
                        console.log(updateMensagem);
                    }else{                        
                    }
                }else{                   
                    
                    //var now = Date.now();                                    

                    /*let novoRegistroKey = lIdKey as string
                    console.log(novoRegistroKey)
                    let novoRegistroJson = JSON.parse(itemMensagem.dataJson as string)
                    console.log(novoRegistroJson)

                    const novoWappKey = 
                    WappKey.create({
                        idKey:  novoRegistroKey,
                        ack:    itemMensagem.ack,
                        dtmsg:  itemMensagem.createdAt,
                        origem: "import",
                        msgJson: novoRegistroJson

                    }).then(function (p) {
                        console.log('created.' + JSON.stringify(p));
                    }).catch(function (err) {
                        console.log('Falha: ' + err);
                    }); 

                    const novoWappMensagempKey = 
                    WappMensagem.create({
                        idKey:  novoRegistroKey,
                        ack:    itemMensagem.ack,
                        dtmsg:  itemMensagem.createdAt,
                        origem: "import",
                        msgJson: novoRegistroJson

                    }).then(function (p) {
                        console.log('created.' + JSON.stringify(p));
                    }).catch(function (err) {
                        console.log('Falha: ' + err);
                    }); */


                }
              }
        }
    } catch (error) {
        console.log(error);        
    }
}

export const getMensagemWpp = async (req: Request, res: Response, next: NextFunction) => {                 
    
    try{
        
        const obj = JSON.stringify(req.body)
        let json = JSON.parse(obj);                

        let lEvent:string = '';
        let lIdKey:string = '';
        let lIdKeyInt     = '';  
        let lFromMe:Boolean = false;
        let lFrom:string = '';
        let lTo:string = '';
        let lBody:string = '';
        let lFileName:string = '';
        let lMediaKey:string = '';
        let lCaption:string = '';
        let lLocalizacao:string = '';
        let lDtMsg:Date = new Date();
        let lProsseguir:Boolean = false;
        let lIdWapp:string;
        let lPessoaWapp:string;
        let lMimeType:string=''; 
        let lTipo:string='';
        let lFotoHash:string='';
        let lFotoUrl:string ='';
        let lIdResposta:string='';

        lEvent = json.event;
        //console.log(lEvent)
            
        if (json.event == 'onack' ){            
            
            lIdKey       = json.id._serialized;
            lFromMe      = json.id.fromMe;
            lFrom        = json.from;
            lTo          = json.to;
            lBody        = json.body;
            lFileName    = json.filename;
            lCaption     = json.caption;
            lTipo        = json.type;
            lProsseguir  = true;
            lDtMsg       = new Date(json.t * 1000)
            lProsseguir  = true;
            lMimeType    = json.mimetype;           

            util.gravaTxt(`${lEvent}_${lIdKey}`,obj);

        }else
        if ( json.event == 'onmessage' && json.type == 'e2e_notification'){
            util.gravaTxt('_ONMESSAGE_E2ENOTIFICATION_'+json.id,obj);
            process.exit;

        }else
        if ( json.event == 'onmessage' && json.type == 'notification_template'){
            util.gravaTxt('_ONMESSAGE_NOTIFICATION_TEMPLATE_'+json.id,obj);
            process.exit;

        }
        else
        if (json.event == 'onmessage' && json.isGroupMsg == false)  {            
            
            lIdKey       = json.id;            
            lFromMe      = json.fromMe;
            lFrom        = json.from;
            lTo          = json.to;
            lBody        = json.body;
            lFileName    = json.filename;
            lMediaKey    = json.mediaKey;
            lCaption     = json.caption;
            lLocalizacao = json.loc;
            lDtMsg       = new Date(json.t * 1000)
            lMimeType    = json.mimetype;
            lProsseguir  = true;

            util.gravaTxt(`ONMESSAGE_${lIdKey}`,obj);
        }else
        if (json.event == 'onmessage' && json.isGroupMsg == true)  {
            
            lIdKey       = json.id;
            
            lFromMe      = json.fromMe;
            lFrom        = json.author;
            lTo          = json.to;
            lBody        = json.body;
            lFileName    = json.filename;
            lMediaKey    = json.mediaKey;
            lCaption     = json.caption;
            lLocalizacao = json.loc;
            lDtMsg       = new Date(json.t * 1000)
            lMimeType    = json.mimetype;
            lProsseguir  = false;

            //let novaPessoa = await addPessoa(json.notifyName, json.author);            
            util.gravaTxt('_ONMESSAGE_GRUPO_'+json.id,obj);
        }        
        else
        if (json.event == 'onmessage' && json.from == "status@broadcast"){            
            
            util.gravaTxt('_ONMESSAGE_GRUPO_'+json.id,obj);
            process.exit;
        }else
        if (json.event == 'onack' && json.from == "status@broadcast"){
            //let novaPessoa = await addPessoa(json.notifyName, json.author);            
            util.gravaTxt('_ONMESSAGE_GRUPO_'+json.id,obj);
            process.exit;
        }else
        if (lEvent == 'onpresencechanged'){
            util.gravaTxt('_ONPRESENCECHANGED_'+json.id,obj);
            process.exit;
        }else
        if (lEvent == 'onrevokedmessage'){
            util.gravaTxt('_ONREVOKEDMESSAGE_'+json.id,obj);
            process.exit;
        }        
        else{
            util.gravaTxt(lEvent.toLocaleUpperCase+'_'+lIdKey,obj);
        }
        
        if (json.hasOwnProperty('sender')){            
            if (json.sender.hasOwnProperty('profilePicThumbObj')){                
                lFotoUrl  = json.sender.profilePicThumbObj.eurl
                lFotoHash =  json.sender.profilePicThumbObj.tag

                //console.log("Tipooff: "+typeof json.sender.profilePicThumbObj.eurl )
            }            
        } 
        
        lIdWapp = (lFromMe == true) ? lFrom : lTo;
        lPessoaWapp = (lFromMe == true) ? lTo : lFrom;
        
        if (json.hasOwnProperty('quotedStanzaID')){            
            let lParticipant = json.quotedParticipant;
            lIdResposta = ((lIdWapp == lParticipant) ? 'true_':'false_') + json.quotedParticipant+'_'+json.quotedStanzaID   
        }              
       
        if (json.hasOwnProperty('quotedMsgId')){            
            //lIdResposta  = typeof json.quotedMsgId === 'undefined' ? lIdResposta : json.quotedMsgId;  
            lIdResposta  = json.quotedMsgId;  
        }              
        
        if (lTo == 'status@broadcast' || lFrom == 'status@broadcast' ){
            lProsseguir = false;
        }

        if (lTo == '' || lFrom == '' ){
            lProsseguir = false;
        }

        let lPosition = lIdKey.indexOf('us_');
        lIdKeyInt = lIdKey.substring(lPosition+3,lIdKey.length)        

        if (lProsseguir == true) { 
            
            /*console.log("Id Wapp: "+lIdWapp)
            console.log("Pessoa Wapp: "+lPessoaWapp)
            console.log("Id Resposta: "+lIdResposta)
            console.log("Foto Url: "+lFotoUrl)
            console.log("Foto Hash: "+lFotoHash) */           
            
            
            let lnovaPessoa: any
            lnovaPessoa = await addPessoa(json.notifyName, lPessoaWapp);
            
            await updateFotoPessoa(lnovaPessoa, lFotoHash, lFotoUrl)
            
            console.log("Wtt ID: "+lIdWapp)           
            console.log("Me?: "+lFromMe)           
            
            if (lFromMe == false){
                verificaTicket(lnovaPessoa, lDtMsg);
            }else{
                atualizaTicket(lnovaPessoa, lDtMsg);
            }
            
            let existeMsgKey = await WappKey.findOne({ 
                where: { 
                    idKey: lIdKey
                } 
            })

            if (!existeMsgKey) {           
                
                const novoWappKey = 
                WappKey.create({
                    idKey:  lIdKey,
                    ack:    json.ack,
                    dtmsg:  lDtMsg,
                    origem: "import",
                    msgJson: req.body

                }).then(function (p) {
                    console.log('created.');
                    //console.log('created.' + JSON.stringify(p));
                }).catch(function (err) {
                    console.log('Falha: ' + err);
                });

                
            }

            let existeMsg = await WappMensagem.findOne({ 
                where: { 
                    idKey: lIdKey
                } 
            })

            if (existeMsg === null) {                             
                
                if (json.type == 'image' || json.type == 'document' || json.type == 'video' || json.type == 'ptt' ){                    
                    lBody ='';                    
                }

                if (json.type == 'location'){                    
                    lCaption = lLocalizacao;                    
                }

                const novoWappMensagempKey = 
                WappMensagem.create({
                    
                    idWapp:lIdWapp,
                    idKey: lIdKey,
                    idFrom: lFrom,
                    idTo: lTo,
                    dtmsg: lDtMsg,
                    nome: json.notifyName,
                    msg: lBody,
                    caption: lCaption,
                    tipo: json.type,
                    mimetype: lMimeType,
                    longitude: json.lat,
                    latitude: json.lng,
                    idKeyResposta: lIdResposta
                    //statusMensagem: number;
                    //mensagempadrao: number;
                    //dtstatus?: Date;
                    //statusEnvio?: number;
                    //statusEnvioMsg?: string;
                    //dtstatusEnvio?: Date;
                    //botoes?: string;            

                }).then(function (p) {
                    console.log('created.');
                }).catch(function (err) {
                    console.log('Falha: ' + err);
                });
            } 

            if (json.type == 'image' || json.type == 'document' || json.type == 'video' || json.type == 'ptt' ){            
                
                console.log("Dados do Arquivo:")
                console.log("Type: "+json.type)
                console.log("MimeType: "+lMimeType)
                console.log("Media Key: "+lMediaKey);

                salvarArquivoWpp(lIdKey, lIdKeyInt, json.body, json.type, lMimeType,lFileName)
                
               
            } 
            
            let lTicket: any
            lTicket  = await utilTickets.getTicketId(lnovaPessoa);

            //console.log("Pessoa: "+lnovaPessoa)
            //console.log("Ticket: "+lTicket)
            
            /*setTimeout(() => {
               utilTickets.getGerarHTMLChat(lPessoaWapp, lTicket,'0') ;
            }, 500);*/
            


        }
        res.status(200).json('OK');     
    } catch (error) {
        console.log(error);    
    }
}

async function salvarArquivoWpp( AIDKey:string,AId:string,ABody:string,AType:string,AMimeType:string,AFileName:string) {
    try{
        
        let DirArquivo:string='';
        let NomeArquivo:string='';
        let lFileExtensao:string='';
        let lPosition = -1;

        console.log("FileName: "+AFileName)        
        
        if (!AFileName == undefined ){
            if (AFileName.length > 0 ){
                lPosition = AFileName.indexOf('.');
                lFileExtensao = AFileName.substring(lPosition,AFileName.length)                
            }
        }else{
            if(AMimeType.indexOf('word') > 0){
                lFileExtensao = '.docx'
            }
            
            if(AMimeType.indexOf('mp4') > 0){
                lFileExtensao = '.mp4'
            }
            
            if(AMimeType.indexOf('mpeg') > 0){
                lFileExtensao = '.mpeg'
            } 
        }     
        
        console.log("Extensao: "+lFileExtensao)
        
        const fs = require("fs");                
        const buffer = Buffer.from(ABody, "base64");
        
        var dirImage = './dist/temp/image/';
        var dirDoc = './dist/temp/doc/';
        var dirVideo = './dist/temp/video/';
        var dirAudio = './dist/temp/audio/';           
        
        
        if (AType == 'image'){                                        
            NomeArquivo = AId+".jpeg";
            DirArquivo = dirImage+NomeArquivo;
            //fs.writeFileSync(dirImage+AId+".jpeg", buffer);
        }       

        if (AType == 'document'){                                                                        
            NomeArquivo = AId+lFileExtensao;
            DirArquivo = dirDoc+NomeArquivo;
            //fs.writeFileSync(dirDoc+AId+lFileExtensao, buffer);
        }

        if (AType == 'video'){                                        
            NomeArquivo = AId+lFileExtensao;
            DirArquivo = dirVideo+NomeArquivo;
            //fs.writeFileSync(dirVideo+AId+lFileExtensao, buffer);
        }

        if (AType == 'ptt'){                                        
            
            NomeArquivo = AId+".mp3";
            DirArquivo = dirAudio+NomeArquivo;
            //fs.writeFileSync(dirAudio+AId+".mp3", buffer);
        }

        fs.writeFileSync(DirArquivo, buffer);

        let existeArquivo = await WappArquivo.findOne({ 
            where: { 
                idKey: AIDKey
            } 
        })

        if (existeArquivo === null) {
            const novoWappArquivoKey = 
            WappArquivo.create({                    
                idKey: AIDKey,                    
                arquivoNome:NomeArquivo,
                arquivoPath:DirArquivo,
                arquivoTipo: AType,
                arquivoBase64: ABody

            }).then(function (p) {
                console.log('created.');
            }).catch(function (err) {
                console.log('Falha: ' + err);
            });
        };    

    }catch (error) {
        console.log(error);    
    }
}


async function verificaTicket( APessoa:string,AData:Date) {
    try{        
        
        console.log("Pessoa: "+APessoa)
        console.log("Data: "+AData)
        
        let ticket = await Ticket.findOne({ 
            where: { 
                pessoa: APessoa, 
                situacao: { [Op.or]: ['A','E'] }
            } 
        })        

        if(ticket){
            console.log("Ticket encontrado")
            ticket.dtultimamsg = new Date();
            await ticket.save();
        }else{
            
            let lSql = ' select * from public.tickets_ignorados ti where ti.pessoa='+APessoa;
            const results = await sequelize.query(lSql,{type: QueryTypes.SELECT})
    
            if(results.length > 0){
                //res.status(200).json(results)
            }else{
                console.log("Ticket Criado")
                let ticket = await Ticket.create({                
                    usuario:1,
                    pessoa: APessoa,
                    situacao: 'E',
                    dtabertura:AData,
                    dtfechamento: null,
                    dtultimamsg: AData,
                    dtatendimento: null,
                    dtcancelamento: null,
                    motivoCancelamento: null
                })      
            }
        }

    } catch (error) {
        console.log(error);    
    }

}

async function atualizaTicket(APessoa:string,AData:Date) {
    try{        
        let ticket = await Ticket.findOne({ 
            where: { 
                pessoa: APessoa, 
                situacao: { [Op.or]: ['A','E'] }
            } 
        })

        //console.log(ticket)

        if(ticket){
            console.log("Ticket encontrado")
            ticket.dtultimamsg = new Date();
            await ticket.save();
        }
    } catch (error) {
        console.log(error);    
    }
}

export async function addPessoa( AName:string, AWpp: string) {
    
    let returnId; 
    
    try {        
        let nomePessoa = AName;
        if (nomePessoa == ''){
          nomePessoa = '+'+util.somenteNumeros(AWpp) 
        }         
        
        let findPessoa = await Pessoa.findOne({ 
            where: { wapp_id: AWpp } 
        })

        if (findPessoa){
            returnId = findPessoa.id
            //console.log('ja adicionado')
        }else{      
        
            let pessoa = await Pessoa.create({
                usuario:1,
                nome:nomePessoa,
                fantasia:null,    
                ie:null, 
                endereco:null, 
                endereco_numero:null, 
                endereco_bairro:null, 
                endereco_cidade:null, 
                endereco_cep:null, 
                endereco_uf:null,
                endereco_comp:null,
                fone:null, 
                apelido:null,
                tipo: 'F',
                ativo:'S',
                enviarmsg: 'S',
                wapp_id:AWpp, 
                dtinclusao: new Date(),
                dtedicao:null, 
                dtinativacao:null, 
                dtultimopedido:null, 
                dtimportacao:null,
                celular: util.somenteNumeros(AWpp),
                pessoa_lead:'S',
                pessoa_cliente:'N', 
                pessoa_fornecedor:'N', 
                pessoa_transportador: 'N', 
                pessoa_vendedor:'N',              
                pessoa_funcionario:'N', 
                pessoa_revenda:'N', 
                cnpj: null,
                email:null , 
                site:'teste' , 
                bling_id:null, 
                celular_ddi:null, 
                celular_ddd:null, 
                celular_numero:null

            }).then(function (p) {
                returnId = p.id
            }).catch(function (err) {
                console.log('Falha: ' + err);
            });
            //console.log(pessoa)
        }
        
        /*if (AUrl !== ''){
            const response = await fetch(AUrl);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const imageBase64  = buffer.toString('base64');            

            const sqlVerifica = "select * from public.pessoas_foto pf where pf.pessoa="+returnId; 

            try{
                const results = await sequelize.query(sqlVerifica,{type: QueryTypes.SELECT})                
                
                if(results.length > 0){
                    let sqlUpdate = "update public.pessoas_foto set foto='"+imageBase64+"' where pessoa="+returnId;
                    const results = await sequelize.query(sqlUpdate,{type: QueryTypes.UPSERT});
                }else{
                    //const sql = "update public.pessoas set foto='"+imageBase64+"' where id="+returnId

                    let sqlInsere = "insert into public.pessoas_foto (pessoa, foto) values ("+returnId+",'"+imageBase64+"')";
                    const results = await sequelize.query(sqlInsere,{type: QueryTypes.UPSERT});
                }       
            } catch (error) {
                console.log('error');               
            }          
        }*/

        
        return returnId
    } catch (err) {
      console.log(err);
    }            
}

export async function updateFotoPessoa( APessoa:string, AHash:string, AUrl:string='') {   
    

    try {                      
        
        if (AUrl !== ''){
            let lHash:string='';
            const response     = await fetch(AUrl);
            const blob         = await response.blob();
            const arrayBuffer  = await blob.arrayBuffer();
            const buffer       = Buffer.from(arrayBuffer);
            
            const imageBase64  = buffer.toString('base64'); 
            
            const fs = require("fs");
            fs.writeFileSync('./dist/temp/contato/'+APessoa+'.jpg', buffer);
            
            const sqlVerifica = "select * from public.pessoas_foto pf where pf.pessoa="+APessoa;
            
            const results = await sequelize.query(sqlVerifica,{
                type: QueryTypes.SELECT
            

            });
        
            if(results.length > 0){
                let lObjJsonArquivo = JSON.parse(JSON.stringify(results));
                lHash = lObjJsonArquivo[0].hash;
            
            }else{
                console.log("nao tem foto");
                lHash = '*12345678999999'
            }

            console.log("Pessoa: "+APessoa);
            console.log("Tag: "+AHash);
            console.log("Hash: "+lHash);
            console.log("Url: "+AUrl);

            if (!(AHash == lHash)) {            
            
                

                try{
                    if(results.length > 0){
                        let sqlUpdate = "update public.pessoas_foto set foto='"+imageBase64+"', hash='"+ AHash +"' where pessoa="+APessoa;
                        const lResults = await sequelize.query(sqlUpdate,{type: QueryTypes.UPSERT});
                    }else{
                        let sqlInsere = "insert into public.pessoas_foto (pessoa, foto) values ("+APessoa+",'"+imageBase64+"')";
                        const lResults = await sequelize.query(sqlInsere,{type: QueryTypes.UPSERT});
                    }       
                } catch (error) {
                    console.log('error');               
                }    
            }
            
            
            /*.then(async function (p) {
                if (p) {                                        
                    let lObjJsonArquivo = JSON.parse(JSON.stringify(p));
                    lHash = lObjJsonArquivo[0].hash;
                }
                console.log(AUrl);                
            }).catch(function (err) {
                console.log('Falha: ' + err);
            }); */                 
        }       
        
    } catch (err) {
      console.log(err);
    }            
}


export async function geraChat( AWppId:string) {


}

export default {
    getMensagem,
    getMensagemAll,
    getMensagem2,
    getMensagemWpp,
    addPessoa
    
    
}