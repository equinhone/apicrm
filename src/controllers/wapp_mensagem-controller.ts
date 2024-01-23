import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { WappMensagem, WappMensagemAttributes } from '../models/wapp_mensagem-model';
import { WappArquivo, WappArquivoAttributes } from '../models/wapp_arquivo-model';
//import ticket, { Ticket, TicketAttributes } from '../models/ticket-model';
import { sequelize } from '../db/db';
import util from '../lib/util'
//import { now } from 'moment-timezone';
import utilTickets, {} from '../lib/util-tickets'


export const create = async (req: Request, res: Response) => {
    try{
    let registroInclusao = req.body as WappMensagemAttributes;    
    
    res.status(201).json(registroInclusao);    
    
    
    //let pessoa = await Pessoa.create(pessoasInclusao);
        /*let result = await WappMensagem.create(req.body);

        if (result) {
            res.status(201).json(result);    
        } else {
            res.status(500);
        }*/
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }          
}

export const getAll = async (req: Request, res: Response) => {
    let result = await WappMensagem.findAll({
        order:[['id','asc']]
    })
    res.status(200).json(result)    
}

export async function getAllFilter(req: Request, res: Response) {
    let { filter } = req.params;
    
    try {
        //let lParam = req.params.situacao;
        let sql =         
        "Select 0 Sel, to_char(wm.dtmsg, 'DD/MM/YYYY') dtinclusao, to_char(wm.dtmsg, 'HH24:MI:SS') hrinclusao, "+
        'wm.id, wm.ID_Wapp idwapp,wm.id_key idkey, wm.id_from idfrom, wm.id_to idto, '+ 
        'wm.Nome, wm.tipo, wm.status_mensagem statusmensagem, LEFT(wm.msg,100) msg, wm.caption, wm.MensagemPadrao, '+
        '(select ack from wapp_key wmk where wmk.id_key=wm.id_key limit 1) ack, '+
        '(select nome from Pessoas plto where plto.Wapp_ID=wm.id_to limit 1) nometo, '+ 
        '(select nome from Pessoas plfrom where plfrom.Wapp_ID=wm.id_from limit 1) nomefrom '+
        //',plto.Nome nometo '+
        //',plfrom.Nome nomefrom '+
        'from wapp_Mensagem wm '+
        //'inner join wapp_key wmk on (wmk.id_key=wm.id_key) '+
        //'left join Pessoas plto on (plto.Wapp_ID=wm.ID_To) '+
        //'left join Pessoas plfrom on (plfrom.Wapp_ID=wm.ID_From) '+
        'where 1=1 ';

        if (filter == '0'){        
            sql = sql + "and wm.dtmsg >= CURRENT_DATE"
            
        }else {
            sql = sql + "and wm.dtmsg >= CURRENT_DATE-"+filter
        }

        sql = sql +' order by wm.dtmsg desc';
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})
 
        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }
      } catch (error) {
        console.log(error);
        res.send(error).status(500);
      }
}

export const getId = async (req: Request, res: Response) => {    
    let { id } = req.params;
    let result = await WappMensagem.findByPk(id)
    
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404);
        res.json({error: 'Registro não localizada'})
    }
}

export const updateId = async (req: Request, res: Response) => {
    let { id } = req.params;
    let resultEdicao = req.body as WappMensagemAttributes;
    const result = await WappMensagem.findByPk(id);
    
    if(result){
        result.set(resultEdicao);
        await result.save();
        res.status(200).json(result);
    }else{
        res.status(404);
        res.json({error: 'Registro não localizada'})
    }
}

export async function deleteId(req: Request, res: Response) {
    let { id } = req.params;
    const result = await WappMensagem.findByPk(id);
    if (result) {
        await WappMensagem.destroy({
            where: {
                id
            }
        });
        res.status(200).json({ msg: 'Registro excluido' });

    } else {
        res.status(404).json({ error: 'Registro não localizado' });
    }
}

export const getMensagemChat = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { ticket } = req.params;
    let { opcao } = req.params;
    
    try {
        
        await utilTickets.getGerarHTMLChat(id,ticket,opcao)
        res.status(200).json("OK") 
        
        //let lParam = req.params.situacao;
        /*let lProsseguir=false;
        let lSqlOpcao = '';
        let lSqlOpcaoBasica = "and wm.dtmsg >= (select t.dtabertura from tickets t where t.id="+ticket+") ";
        let lSqlOrder = 'order by wm.dtmsg';
        let lSqlConsulta='';
        let lSql =         
        "select wm.* from wapp_mensagem wm "+
        "where (wm.id_from = "+"'"+ id +"'"+" or wm.id_to ="+"'"+ id +"'"+") ";

        if (opcao == '0'){            
            lSqlConsulta = lSql + lSqlOpcaoBasica + lSqlOrder
        }

        if (opcao == '1'){                        
            lSqlOpcao = "and wm.dtmsg >= NOW() - INTERVAL '3 DAY' ";
            lSqlConsulta = lSql + lSqlOpcao + lSqlOrder
        }        

        let results = await sequelize.query(lSqlConsulta,{type: QueryTypes.SELECT})
 
        if(results.length > 0){
            lProsseguir = true;            
        }else{         
            let lSqlConsulta = lSql + lSqlOpcaoBasica + lSqlOrder
            results = await sequelize.query(lSqlConsulta,{type: QueryTypes.SELECT})            
            if(results.length > 0){
                lProsseguir = true; 
            }
        }

        //console.log(results.length)
        if (lProsseguir) {
            //console.log(results.length)
            //await utilTickets.getGerarHTMLChat(id,ticket,'')  
            //await utilTickets.getGerarHTMLChat(id,ticket,JSON.stringify(results))            
            res.status(200).json("OK")
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }*/

      } catch (error) {
        console.log(error);
        res.send(error).status(500);
      }
}

export default {
    create,
    getAll,
    getAllFilter,    
    getId,
    updateId,
    deleteId,
    getMensagemChat
    
}