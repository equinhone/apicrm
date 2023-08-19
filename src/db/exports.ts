
const SequelizeAuto = require('sequelize-auto');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'crmame',
    'ame',
    'desenv2023',
    {
        dialect: 'postgres',
        port: 5432
    }
);

// const sequelize = new Sequelize('sqlite::memory:');

//const options = { caseFile: 'l', caseModel: 'p', caseProp: 'c' };
const path = require('path');
const output = path.join(__dirname, "./models");
const options = { directory: output, caseFile: 'l', caseModel: 'p', caseProp: 'c', lang: 'ts', useDefine: false, singularize: true, spaces: true, indentation: 2 };


const auto = new SequelizeAuto(sequelize, null, null, options);
auto.run();