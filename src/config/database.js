require('dotenv').config();
module.exports ={
  "development": {
    "username": "ame",
    "password": "desenv2023",
    "database": "crmamed",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "ame",
    "password": "desenv2023",
    "database": "crmame",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

