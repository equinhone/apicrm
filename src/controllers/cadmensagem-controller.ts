import { sequelize } from '../db/db';
import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { CadMensagem, CadMensagemAttributes } from '../models/cadmensagem-model';

export const create = async (req: Request, res: Response) => {
    try{
        //const body = req.body;
        //let registroInclusao = body as CadMensagemAttributes;    
        
        //let pessoa = await Pessoa.create(pessoasInclusao);
        let result = await CadMensagem.create(req.body);        

        if (result) {
            res.status(200).json(result);    
        } else {
            res.status(500);
        }
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }        
}

export const updateId = async (req: Request, res: Response) => {
    try{    
        let { id } = req.params;
        let cadmensagemEdicao = req.body as CadMensagemAttributes;
        const cadmensagem = await CadMensagem.findByPk(id);

        if(cadmensagem){
            cadmensagem.set(cadmensagemEdicao);
            await cadmensagem.save();
            res.status(200).json(cadmensagem);
        }else{
            res.status(404);
            res.json({error: 'Pessoa não localizada'})
        }
    } catch (error) {
        console.log(error);
        //res.send(error).status(500);
    }  
}


export const getAll = async (req: Request, res: Response) => {
    let cadmensagem = await CadMensagem.findAll({
        attributes: {exclude: ['imagem64']},
        order:[['id','asc']]
    })
    res.status(200).json(cadmensagem)    
}

export const getId = async (req: Request, res: Response) => {    
    let { id } = req.params;

    try{
        let cadmensagem = await CadMensagem.findByPk(id)              
        
        if(cadmensagem){
            res.status(200).json(cadmensagem)
        }else{
            res.status(201).json({error: 'Pessoa não localizada'})
        }       
      
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }

}

export async function getImagemId(req: Request, res: Response, next: NextFunction) {

    let lParam = req.params.id;
    let sql = 'select imagem_tipo, imagem_hash, imagem64 from cad_mensagem where id='+lParam+' limit 1' as string;   
    
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

export const deleteId = async (req: Request, res: Response) => {
    let { id } = req.params;
    const cadmensagem = await CadMensagem.findByPk(id);
    if(cadmensagem){        
        await CadMensagem.destroy({
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
    create,
    getAll,
    getId,
    getImagemId,
    updateId,
    deleteId
}