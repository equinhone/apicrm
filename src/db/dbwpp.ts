import { Sequelize } from 'sequelize';
//const Sequelize = require('sequelize');
import dotenv from 'dotenv';

dotenv.config();

//const Sequelize = require('sequelize');
//export const sequelizeWpp = new Sequelize('postgres://ame@194.34.232.90:5432/ame', {dialect: 'postgres'});

const sequelizeWpp = new Sequelize(
    process.env.WAA_PG_DB as string,
    process.env.WAA_PG_USER as string,
    process.env.WAA_PG_PASSWORD as string,
    {        
        //host: process.env.WAA_PG_HOST as string,
        //dialect: 'postgres',
        //port: parseInt(process.env.WAA_PG_PORT as string),        
        dialect: 'postgres',
        port: parseInt(process.env.WAA_PG_PORT as string),
        dialectOptions: { 
            useUTC: false,
            timezone: '-04:00' // for reading the data
        },
        timezone: '-04:00', // for writing the data
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    }
);


console.info('SETUP - Connecting database...')

sequelizeWpp
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })



export default sequelizeWpp