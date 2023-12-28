
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

const fs = require('fs/promises');

async function gravaTxt(AFileName:String,AContent:String) {
  try {
    //const content = 'Some content!';
    await fs.writeFile('C:/CRMAME/Node/'+AFileName+'.txt', AContent);
  } catch (err) {
    console.log(err);
  }
}

export const getMensagemWpp = async (req: Request, res: Response, next: NextFunction) => {                 
    
    try{
        
        const obj = JSON.stringify(req.body)
        let json = JSON.parse(obj);                

        let lEvent:string = '';
        let lIdKey:string = '';
        let lFromMe:Boolean = false;
        let lFrom:string = '';
        let lTo:string = '';
        let lBody:string = '';
        let lBodyArquivo:string = '';
        let lCaption:string = '';
        let lDtMsg:Date = new Date();
        let lProsseguir:Boolean = false;
        let lIdWapp:string;
        let lPessoaWapp:string;
        let lMimeType:string=''; 
        let lTipo:string='';
        let lUrl:string ='';        

        lEvent = json.event;
        console.log(lEvent)
            
        if (json.event == 'onack' ){            

            lIdKey       = json.id._serialized;
            lFromMe      = json.id.fromMe;
            lFrom        = json.from;
            lTo          = json.to;
            lBody        = json.body;
            lBodyArquivo = json.body;
            lCaption     = json.caption;
            lTipo        = json.type;
            lProsseguir  = true;
            lDtMsg       = new Date(json.t * 1000)
            lProsseguir  = true;
            lMimeType    = json.mimetype;            

            //gravaTxt(`${lEvent}_${lIdKey}`,obj);

        }else
        if ( json.event == 'onmessage' && json.type == 'e2e_notification'){
            //gravaTxt('ONMESSAGE_E2ENOTIFICATION_'+json.id,obj);

        }else
        if (json.event == 'onmessage' && json.isGroupMsg == false)  {            
            
            lIdKey   = json.id;
            lFromMe  = json.fromMe;
            lFrom    = json.from;
            lTo      = json.to;
            lBody    = json.body;
            lBodyArquivo = json.body;
            lCaption = json.caption;
            lDtMsg = new Date(json.t * 1000)
            lMimeType = json.mimetype;
            lProsseguir = true;
            lUrl = json.sender.profilePicThumbObj.eurl             
            
            if (lUrl == undefined){
                lUrl = '';
            }
            //console.log(dtMsg);
            //dtMsg.setHours(dtMsg.getHours()-4);
            //console.log(dtMsg);

            //gravaTxt(`ONMESSAGE_${lIdKey}`,obj);
        }else
        if (json.event == 'onmessage' && json.isGroupMsg == true)  {
            
            let novaPessoa = await addPessoa(json.notifyName, json.author);            
            //gravaTxt('ONMESSAGE_GRUPO_'+json.id,obj);
        }        
        else
        if (json.event == 'onmessage' && json.from == "status@broadcast"){
            
            //let novaPessoa = await addPessoa(json.notifyName, json.author);            
            //gravaTxt('ONMESSAGE_GRUPO_'+json.id,obj);
        }else
        if (json.event == 'onack' && json.from == "status@broadcast"){
            //let novaPessoa = await addPessoa(json.notifyName, json.author);
            //gravaTxt('ONMESSAGE_GRUPO_'+json.id,obj);
        }else
        if (lEvent == 'onpresencechanged'){
            //gravaTxt('ONPRESENCECHANGED_'+json.id,obj);
        }else
        if (lEvent == 'onrevokedmessage'){
            //gravaTxt('ONREVOKEDMESSAGE_'+json.id,obj);
        }        
        else{
            //gravaTxt(lEvent.toLocaleUpperCase+'_'+lIdKey,obj);
        }

        if (lFromMe == true){
            lIdWapp = lFrom
            lPessoaWapp = lTo            
        }else{
            lIdWapp = lTo
            lPessoaWapp = lFrom
        }        
        
        if (lTo == 'status@broadcast' || lFrom == 'status@broadcast' ){
            lProsseguir = false;
        }

        if (lTo == '' || lFrom == '' ){
            lProsseguir = false;
        }

        if (lProsseguir == true) { 
            
            let lnovaPessoa: any
            lnovaPessoa = await addPessoa(json.notifyName, lPessoaWapp, lUrl);
            console.log("Pessoa ID: "+lnovaPessoa)           
            
            
            /*let findPessoa = await Pessoa.findOne({ 
                where: { wapp_id: lPessoaWapp } 
            })

            
            if(findPessoa){
                lnovaPessoa = findPessoa.id
                //console.log("Pessoa localizada:"+lnovaPessoa)
            }else{
                lnovaPessoa = await addPessoa(json.notifyName, lPessoaWapp);                                        
                //console.log("Pessoa registrada: "+ lnovaPessoa)                
            }*/                      
            
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

            if (existeMsgKey === null) {           
                
                const novoWappKey = 
                WappKey.create({
                    idKey:  lIdKey,
                    ack:    json.ack,
                    dtmsg:  lDtMsg,
                    origem: "import",
                    msgJson: req.body

                }).then(function (p) {
                    console.log('created.' + JSON.stringify(p));
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
                
                //console.log('Nao existe a msg')
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
                    latitude: json.lng
                    //statusMensagem: number;
                    //mensagempadrao: number;
                    //dtstatus?: Date;
                    //statusEnvio?: number;
                    //statusEnvioMsg?: string;
                    //dtstatusEnvio?: Date;
                    //botoes?: string;            

                }).then(function (p) {
                    console.log('created.' + JSON.stringify(p));
                }).catch(function (err) {
                    console.log('Falha: ' + err);
                });
            } 
            
            console.log("Tipo de Arquivo:")
            console.log(json.type)

            if (json.type == 'image' || json.type == 'document' || json.type == 'video' || json.type == 'ptt' ){            
                let existeArquivo = await WappArquivo.findOne({ 
                    where: { 
                        idKey: lIdKey
                    } 
                })

                if (existeArquivo === null) {
                    const novoWappArquivoKey = 
                    WappArquivo.create({                    
                        idKey: lIdKey,                    
                        arquivoNome:lCaption,
                        arquivoTipo: json.type,
                        arquivoBase64: lBodyArquivo

                    }).then(function (p) {
                        console.log('created.' + JSON.stringify(p));
                    }).catch(function (err) {
                        console.log('Falha: ' + err);
                    });
                };
            }
                
        }
        res.status(200).json('OK');     
    } catch (error) {
        console.log(error);    
    }
}

async function verificaTicket( APessoa:string,AData:Date) {
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

export async function addPessoa( AName:string, AWpp: string, AUrl:string='') {
    
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
        
        if (AUrl !== ''){
            const response = await fetch(AUrl);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const imageBase64  = buffer.toString('base64');            
            
            //const sql = "update public.pessoas set foto='"+imageBase64+"' where id="+returnId

            const sql = "insert into public.pessoas_foto (pessoa, foto) values ("+returnId+"','"+imageBase64+"')'"

            const results = await sequelize.query(sql,{type: QueryTypes.UPSERT});
        }

        
        return returnId
    } catch (err) {
      console.log(err);
    }            
}

export default {
    getMensagem,
    getMensagemAll,
    getMensagem2,
    getMensagemWpp
}