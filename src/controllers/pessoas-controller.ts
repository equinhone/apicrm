import express,{ Request, Response, NextFunction } from 'express';
import pessoas, { Pessoa, PessoaInterface } from '../models/pessoa-model';

export const createPessoas = async (req: Request, res: Response) => {
    
    //let pessoasInclusao = req.body as PessoaInterface;    
    //let pessoa = await Pessoa.create(pessoasInclusao);
    let pessoa = await Pessoa.create(req.body);

    if (pessoa) {
        res.status(201).json(pessoa);    
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
        res.status(200);
        res.json({msg: 'Pessoa excluida'})
        
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }   
}

export default {
    createPessoas,
    getPessoas,
    getPessoa,
    updatePessoas,
    deletePessoas
}