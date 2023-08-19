import { sequelize } from '../db/db';

import express,{ Request, Response, NextFunction } from 'express';
import ticket, { Ticket, TicketAttributes } from '../models/ticket-model';
import { QueryTypes } from 'sequelize';
import moment from 'moment-timezone'

export const createTicket = async (req: Request, res: Response) => {
    
    //let pessoasInclusao = req.body as PessoaInterface;    
    //let pessoa = await Pessoa.create(pessoasInclusao);
    let ticket = await Ticket.create(req.body);

    if (ticket) {
        res.status(201).json(ticket);    
      } else {
        res.status(500);
      }    
}

export const getTickets = async (req: Request, res: Response) => {
    let tickets = await Ticket.findAll({
        order:[['id','asc']]
    })
    res.status(200);
    res.json(tickets)    
}

export async function getTicket(req: Request, res: Response) {
    let { id } = req.params;
    let ticket = await Ticket.findByPk(id);

    if (ticket) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404);
        res.json({ error: 'Ticket não localizada' });
    }
}

export async function updateTicket (req: Request, res: Response) {
    let { id } = req.params;
    let ticketEdicao = req.body as TicketAttributes;
    const ticket = await Ticket.findByPk(id);
    
    if(ticket){
        ticket.set(ticketEdicao);
        await ticket.save();
        res.status(200);
        res.json(ticket);
    }else{
        res.status(404);
        res.json({error: 'Ticket não localizada'})
    }
}

export const deleteTicket = async (req: Request, res: Response) => {
    let { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if(ticket){        
        await Ticket.destroy({
            where: {
                id
            }
        });
        res.status(200);
        res.json({msg: 'Ticket excluida'})
        
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }   
}

export async function getTicketsAtendimento(req: Request, res: Response, next: NextFunction) {
    try {
        //let lParam = req.params.situacao;
        let sql = 'select * from vwticketsabertos';
        
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})
        
        //const ticket = await  Ticket.findAll({ 
        //    where: { situacao: req.params.situacao as string },
        //    order:[['dtultimamsg','desc']] 
        //});                
 
        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }
      } catch (error) {
        console.log('error');
        res.send(error).status(500);
      }
}

export async function getTicketsEspera(req: Request, res: Response, next: NextFunction) {
    try {
        let sql = 'select * from vwticketsespera';

        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})        

        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
}

export async function getNovoTicketsEspera(req: Request, res: Response, next: NextFunction) {
    let  lDataInicio = req.query.datainicio as string;    
    //let  lData:Date = new Date(lDataInicio)   ;
    let sql = "select * from vwticketsespera te where te.dtabertura>='"+lDataInicio+"'"          
    try{
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})        

        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }       
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
}

export async function iniciarAtendimentoTicket (req: Request, res: Response) {
    let { id } = req.params;    
    let sql = "UPDATE tickets SET dtatendimento=now(), situacao='A'  WHERE id="+id
    try{
        const results = await sequelize.query(sql,{type: QueryTypes.UPDATE});        
        res.status(200).json(results);       
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
}

export async function encerrartendimentoTicket (req: Request, res: Response) {
    let { id } = req.params;           
    let sql = "UPDATE tickets SET dtfechamento=now(), situacao='F' WHERE id="+id
    try{
        const results = await sequelize.query(sql,{type: QueryTypes.UPDATE});        
        res.status(200).json(results);  
    
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
}

export default {
    createTicket,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket,
    getTicketsAtendimento,
    getTicketsEspera,
    getNovoTicketsEspera,
    iniciarAtendimentoTicket,
    encerrartendimentoTicket
}
