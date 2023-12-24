import { sequelize } from '../db/db';
import { QueryTypes } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { CadMensagemCategoria, CadMensagemCategoriaAttributes } from '../models/cadmensagem-categoria-model';

export const create = async (req: Request, res: Response) => {
    
    //let pessoasInclusao = req.body as PessoaInterface;    
    //let pessoa = await Pessoa.create(pessoasInclusao);
    let pessoa = await CadMensagemCategoria.create(req.body);

    if (pessoa) {
        res.status(201).json(pessoa);    
      } else {
        res.status(500);
      }    
}


export const getAll = async (req: Request, res: Response) => {
    try {
        const results = await CadMensagemCategoria.findAll({
            order:[['id','asc']]
        });
        
        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(204).json({error: 'registro não localizado'})
        }
      } catch (error) {
        console.log('error');
        res.send(error).status(500);
      }


    
    /*for (let i = 0; i < result.length; i++)  {
        console.log(result[i].dataValues);
      }*/
    
    
    
    /*result.forEach( 
        (CadMensagemCategoriaAttributes) => { 
          console.log(CadMensagemCategoriaAttributes.descricao);
        }
      );*/
 
}

export const getId = async (req: Request, res: Response) => {    
    let { id } = req.params;
    let pessoas = await CadMensagemCategoria.findByPk(id)
    
    if(pessoas){
        res.status(200);
        res.json(pessoas)
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }
}

export async function updateId(req: Request, res: Response) {
    let { id } = req.params;
    let regiostroEdicao = req.body as CadMensagemCategoriaAttributes;
    const registro = await CadMensagemCategoria.findByPk(id);
    

    if(registro){
        registro.set(regiostroEdicao);
        await registro.save();
        res.status(200).json(registro);
    }else{
        res.status(404).json({error: 'Pessoa não localizada'})
    }
}

export const deleteId = async (req: Request, res: Response) => {
    let { id } = req.params;
    const registro = await CadMensagemCategoria.findByPk(id);
    if(registro){        
        await CadMensagemCategoria.destroy({
            where: {
                id
            }
        });
        res.status(200);
        res.json({msg: 'registro excluido'})
        
    }else{
        res.status(404);
        res.json({error: 'registro não localizada'})
    }   
}

export default {
    create,
    getAll,
    getId,    
    updateId,
    deleteId
}