import { sequelize } from '../db/db';
import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { Campanha, CampanhaAttributes } from '../models/campanhas-model';
import { CampanhasPessoas, CampanhasPessoasAttributes } from '../models/campanhas_pessoas-models';


export const create = async (req: Request, res: Response) => {
    try{
        //const body = req.body;
        //let registroInclusao = body as CadMensagemAttributes;    
        
        //let pessoa = await Pessoa.create(pessoasInclusao);
        let result = await Campanha.create(req.body);        

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

export const createChild = async (req: Request, res: Response) => {
    try{
        const body = req.body;
        let registroInclusao = body as CampanhasPessoasAttributes;    
        
        //let pessoa = await Pessoa.create(pessoasInclusao);
        
        let findPessoa = await CampanhasPessoas.findOne({ 
            //attributes: ['id'],  
            where: { id_campanhas: registroInclusao.id_campanhas,
                     id_pessoas: registroInclusao.id_pessoas} 
        })

        if(!findPessoa){
            let result = await CampanhasPessoas.create(req.body);        

            if (result) {
                res.status(200).json(result);    
            } else {
                res.status(500);
            }
        }else{
            res.status(200).json(findPessoa); 
        }
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }        
}

export const updateId = async (req: Request, res: Response) => {
    try{    
        let { id } = req.params;
        let lEdicao = req.body as CampanhaAttributes;
        const lCampanha  = await Campanha.findByPk(id);

        if(lCampanha){
            lCampanha.set(lEdicao);
            await lCampanha.save();
            res.status(200).json(lCampanha);
        }else{
            res.status(404);
            res.json({error: 'campanha não localizada'})
        }
    } catch (error) {
        console.log(error);
        //res.send(error).status(500);
    }  
}

export const getAll = async (req: Request, res: Response) => {
    let cadmensagem = await Campanha.findAll({        
        order:[['id','asc']]
    })
    res.status(200).json(cadmensagem)    
}

export const getAllPessoas = async (req: Request, res: Response) => {
    let { id } = req.params;
    
    let sql = 'select cp.*, p.nome from campanhas_pessoas cp '+
              'left join pessoas p on (p.id=cp.id_pessoas) '+
              'where cp.id_campanhas='+id;
    
    try{
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT})        

        if(results.length > 0){
            res.status(200).json(results)
        }else{            
            res.status(201).json(results)            
        }       
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }
    
    
    
    
    /*let findPessoa = await CampanhasPessoas.findAll({ 
        //attributes: ['id'],  
        where: { id_campanhas: id},
        order:[['id','asc']] 
    })   
    
   
    res.status(200).json(findPessoa)*/
}

export const getId = async (req: Request, res: Response) => {    
    let { id } = req.params;

    try{
        let cadmensagem = await Campanha.findByPk(id)              
        
        if(cadmensagem){
            res.status(200).json(cadmensagem)
        }else{
            res.status(201).json({error: 'Campanha não localizada'})
        }       
      
    } catch (error) {
        console.log('error');
        res.send(error).status(500);
    }

}

export const deleteId = async (req: Request, res: Response) => {
    let { id } = req.params;
    const cadmensagem = await Campanha.findByPk(id);
    if(cadmensagem){        
        await Campanha.destroy({
            where: {
                id
            }
        });
        res.status(200);
        res.json({msg: 'Campanha excluida'})
        
    }else{
        res.status(404);
        res.json({error: 'Campanha não localizada'})
    }   
}

export const deletePessoa = async (req: Request, res: Response) => {
    
    const body = req.body;
    let registroInclusao = body as CampanhasPessoasAttributes; 
    
    console.log(registroInclusao)
    
    let findPessoa = await CampanhasPessoas.findOne({ 
        //attributes: ['id'],  
        where: { id_campanhas: registroInclusao.id_campanhas,
                 id_pessoas: registroInclusao.id_pessoas} 
    })      
    
    if(findPessoa){        
        await CampanhasPessoas.destroy({
            where: { id_campanhas: registroInclusao.id_campanhas,
                id_pessoas: registroInclusao.id_pessoas} 
        });
        res.status(200).json({msg: 'Campanha excluida'})
        
    }else{
        res.status(404);
        res.json({error: 'Campanha não localizada'})
    }   
}

export default {
    create,
    createChild,
    getAll,
    getAllPessoas,
    getId,    
    updateId,
    deleteId,
    deletePessoa
}