import express,{ Request, Response, NextFunction } from 'express';
import pessoas, { Municipio } from '../models/municipio-model';
const Sequelize = require('sequelize');

export const getMunicipios = async (req: Request, res: Response) => {
    let municipio = await Municipio.findAll({
        order:[['id','asc']]
    })
    
    if(municipio){
        res.status(200).json(municipio)
    }else{
        res.status(404).json({error: 'Pessoa não localizada'})
    }
}


export async function getUF(req: Request, res: Response, next: NextFunction) {    
    
    let municipio = await Municipio.findAll({        
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('uf')) ,'uf']
        ],
        order:[['uf','asc']]
    })    
    
    if(municipio){
        res.status(200).json(municipio)
    }else{
        res.status(404).json({error: 'municipio não localizado'})
    }
}

export async function getMunicipiosUF(req: Request, res: Response, next: NextFunction) {
    let lUF = req.params.uf;
    
    let municipio = await Municipio.findAll({
        where: {
        'uf': lUF
        },
        order:[['id','asc']]
    })    
    
    if(municipio){
        res.status(200).json(municipio)
    }else{
        res.status(404).json({error: 'Pessoa não localizada'})
    }
}

export default {
    
    getMunicipios,
    getMunicipiosUF,
    getUF
    
}