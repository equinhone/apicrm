import { sequelize } from '../db/db';
import { QueryTypes } from 'sequelize';
import express,{ Request, Response, NextFunction, response } from 'express';
import pessoas, { Pessoa, PessoaInterface } from '../models/pessoa-model';
import { ImportaContatosJson } from 'src/lib/ImportaContatosJson';
import util from '../lib/util'
import * as fs from 'fs';


export const createPessoas = async (req: Request, res: Response) => {
    
    //let pessoasInclusao = req.body as PessoaInterface;    
    //let pessoa = await Pessoa.create(pessoasInclusao);
    let pessoa = await Pessoa.create(req.body);

    if (pessoa) {
        res.status(200).json(pessoa);    
      } else {
        res.status(500);
      }    
}


export const getPessoas = async (req: Request, res: Response) => {
    let pessoas = await Pessoa.findAll({
        order:[['id','asc']]
    })
    res.status(200);
    res.json(pessoas)    
}

export const getPessoa = async (req: Request, res: Response) => {    
    let { id } = req.params;
    let pessoas = await Pessoa.findByPk(id)
    
    if(pessoas){
        res.status(200);
        res.json(pessoas)
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }
}

export const updatePessoas = async (req: Request, res: Response) => {
    let { id } = req.params;
    let pessoasEdicao = req.body as PessoaInterface;
    const pessoa = await Pessoa.findByPk(id);
    
    if(pessoa){
        pessoa.set(pessoasEdicao);
        await pessoa.save();
        res.status(200);
        res.json(pessoa);
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }
}

export const deletePessoas = async (req: Request, res: Response) => {
    let { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);
    if(pessoa){        
        await Pessoa.destroy({
            where: {
                id
            }
        });
        res.status(200).json({msg: 'Pessoa excluida'})        
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }   
}

export async function getFoto(req: Request, res: Response, next: NextFunction) {

    let id  = req.params.id;
    let sql = 'select p.foto from public.pessoas p where p.id='+id;   
    
    try{
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})        

        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(201).json({error: 'nao encontrado'})            
        }       
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
}

import {addPessoa} from '../services/mensagem-controller'


export async function importaContato(req: Request, res: Response, next: NextFunction) {    
    
    try{
        
        //const jsonString = fs.readFileSync('./import/response.json', 'utf-8');

        const response = await fetch('http://127.0.0.1:21465/api/nova/all-chats', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer $2b$10$5_GMGFdhAfbhKQHeRBoQV.7W0Ld0c_8UfsUGA6zVJNf0LNjSGHT1K'
            }            
        });

        const jsonString = await response.json();        

        console.log(jsonString)

        const jsonData = JSON.parse(JSON.stringify(jsonString));
        console.log('Contatos: '+jsonData.response.length)
        if (jsonData.response != null){
            for (var i = 0; i < jsonData.response.length; i++) {
            //for (var i = 0; i < 15; i++) {
                //var jsonData1 = jsonData.response[i];
                //console.log(jsonData.response[i].isGroup)
                //console.log(jsonData.response[i].id._serialized)
                
                if (jsonData.response[i].isGroup == false){
                    
                    let lName = jsonData.response[i].contact.name
                    let lWapp = jsonData.response[i].id._serialized
                    let lUrl:string=''                    
                    
                    try{
                        lUrl = jsonData.response[i].contact.profilePicThumbObj.eurl
                        
                        //const jsonObject = JSON.parse(JSON.stringify(jsonData.response[i].contact.profilePicThumbObj));
                        //console.log(jsonObject)

                        //lUrl = JSON.stringify(jsonObject["eurl"])

                        if (lUrl == undefined){
                            lUrl = '';
                        }
                    } catch (error) {
                        lUrl = '';
                    }                    

                    if ( lName == null ){
                        lName = jsonData.response[i].contact.pushname
                    }
                    
                    if ( lName == null ){
                        lName = jsonData.response[i].id.user
                    }                    
                    
                    await addPessoa(lName,lWapp,'')
                    
                    if ( lUrl !== null && lUrl !== '' ){
                        const lFileName:string = './assets/pessoas/' + jsonData.response[i].id.user + '.jpeg' 
                        console.log(lUrl)
                        console.log(lFileName)
                        await util.downloadImageUrl(lUrl,lFileName)                        
                        await updatePessoasFoto(lWapp,lUrl)
                    }
                }
            } 
        }      
        res.send(jsonData).status(200);
        
        
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }
}

export async function updatePessoasFoto(APessoaWpp:string, AUrl:string) {        

    try {
        const response = await fetch(AUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageBase64  = buffer.toString('base64');
        
        const sql = "update public.pessoas set foto='"+imageBase64+"' where wapp_id='"+APessoaWpp+"'" 

        util.gravaTxt("update"+APessoaWpp+".sql",sql)

        const results = await sequelize.query(sql,{type: QueryTypes.UPSERT});        
        
    } catch (error) {
        console.log(error)
        
    } 
}

export default {
    createPessoas,
    getPessoas,
    getFoto,
    getPessoa,
    updatePessoas,
    deletePessoas,
    updatePessoasFoto,
    importaContato
}