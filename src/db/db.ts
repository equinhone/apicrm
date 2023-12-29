import { Sequelize, QueryTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/crud', {dialect: 'postgres'});

const timezone = 'UTC'
process.env.TZ = timezone

export const 
sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {        
        //host: process.env.PG_HOST as string,
        dialect: 'postgres',
        port: parseInt(process.env.PG_PORT as string),
        dialectOptions: { 
            useUTC: false,
            timezone: '-04:00' // for reading the data
        },
        timezone: '-04:00' // for writing the data
    }
);

/*sequelize.authenticate()
.then(auth => {
  console.log('Connection has been established successfully.');
  let sql = `select current_setting('TIMEZONE') as timezone, current_timestamp as time1, 
 current_timestamp AT TIME ZONE 'EST5EDT' as time_est,
 current_timestamp AT TIME ZONE 'UTC' as time_utc,
 current_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'EST5EDT' as time_est2`
  sequelize.query(sql, { type: QueryTypes.SELECT})
    .then(res => {
        console.log('Query done...', res);
    })
});*/
//module.exports = sequelize;
