import express,{ Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/db';

interface sqlnterface {
    sql: string;
}


export const getGeral = async (req: Request, res: Response, next: NextFunction) => {
    //const results = await sequelize.query("select * from pessoas p where p.id >=3380");    
    //let sql = req.body as sqlnterface;
    let sql = req.query.sql as string;    

    try {
        const results = await sequelize.query(sql,{type: QueryTypes.SELECT}) 
        
        if(results.length > 0){
            res.status(200);
            res.json(results)
        }else{
            res.status(404);
            res.json({error: 'registro não localizado'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const postGeral = async (req: Request, res: Response, next: NextFunction) => {

    let sql = req.query.sql as string;          

    try {
        const results = await sequelize.query(sql,{type: QueryTypes.UPSERT});        
        res.status(200).json('OK');
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export default {
    getGeral,postGeral
}