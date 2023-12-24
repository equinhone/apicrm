import { Request, Response, NextFunction } from 'express';
import { WappKey, WappKeyAttributes } from '../models/wapp_key-model';
import { WappMensagemAttributes } from 'src/models/wapp_mensagem-model';

export const create = async (req: Request, res: Response) => {
    
    //let pessoasInclusao = req.body as PessoaInterface;    
    //let pessoa = await Pessoa.create(pessoasInclusao);
    let result = await WappKey.create(req.body);

    if (result) {
        res.status(201).json(result);    
      } else {
        res.status(500);
      }    
}

export const getAll = async (req: Request, res: Response) => {
    let result = await WappKey.findAll({
        order:[['id','asc']]
    })
    res.status(200).json(result)    
}

export const getId = async (req: Request, res: Response) => {    
    let { id } = req.params;
    let result = await WappKey.findByPk(id)
    
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
    const result = await WappKey.findByPk(id);
    
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
    const result = await WappKey.findByPk(id);
    if (result) {
        await WappKey.destroy({
            where: {
                id
            }
        });
        res.status(200).json({ msg: 'Registro excluido' });

    } else {
        res.status(404).json({ error: 'Registro não localizado' });
    }
}

export default {
    create,
    getAll,    
    getId,
    updateId,
    deleteId
}