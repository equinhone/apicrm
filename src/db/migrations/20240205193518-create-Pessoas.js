'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pessoas', {
      
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
          type: Sequelize.STRING(150),
          allowNull: false
      }
    })
      
      
      /*id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
      },
      usuario: {
          type: Sequelize.INTEGER
      },
      nome: {
          type: Sequelize.STRING,

      },
      fantasia: {
          type: Sequelize.STRING
      },    
      apelido: {
          type: Sequelize.STRING
      }, 
      tipo: {
          type: Sequelize.STRING
      }, 
      ativo: {
          type: Sequelize.STRING
      }, 
      //foto: {
      //    type: DataTypes.STRING
      //}, 
      enviarmsg: {
          type: Sequelize.STRING
      }, 
      cnpj: {
          type: Sequelize.STRING
      }, 
      ie: {
          type: Sequelize.STRING
      }, 
      endereco: {
          type: Sequelize.STRING
      }, 
      endereco_numero: {
          type: Sequelize.STRING
      }, 
      endereco_bairro: {
          type: Sequelize.STRING
      }, 
      endereco_cidade: {
          type: Sequelize.STRING
      }, 
      endereco_cep: {
          type: Sequelize.STRING
      }, 
      endereco_uf: {
          type: Sequelize.STRING
      },
      endereco_comp: {
          type: Sequelize.STRING
      },
      fone: {
          type: Sequelize.STRING
      }, 
      celular: {
          type: Sequelize.STRING
      }, 
      email: {
          type: Sequelize.STRING
      }, 
      site: {
          type: Sequelize.STRING
      }, 
      dtinclusao: {
          type: Sequelize.DATE,
          defaultValue: sequelize.fn('now')
      }, 
      dtedicao: {
          type: Sequelize.STRING
      }, 
      dtinativacao: {
          type: Sequelize.STRING
      }, 
      dtultimopedido: {
          type: Sequelize.STRING
      }, 
      dtimportacao: {
          type: Sequelize.STRING
      }, 
      wapp_id: {
          type: Sequelize.STRING
      }, 
      bling_id: {
          type: Sequelize.STRING
      }, 
      pessoa_cliente: {
          type: Sequelize.STRING,
          defaultValue: "N",
      }, 
      pessoa_fornecedor: {
          type: Sequelize.STRING,
          defaultValue: "N",

      }, 
      pessoa_transportador: {
          type: Sequelize.STRING,
          defaultValue: "N",
      }, 
      pessoa_vendedor: {
          type: Sequelize.STRING,
          defaultValue: "N",
      }, 
      pessoa_lead: {
          type: Sequelize.STRING,
          defaultValue: "N",
      }, 
      pessoa_funcionario: {
          type: DatSequelizeaTypes.STRING,
          defaultValue: "N",
      }, 
      pessoa_revenda: {
          type: Sequelize.STRING,
          defaultValue: "N",
      }, 
      celular_ddi: {
          type: Sequelize.STRING
      }, 
      celular_ddd: {
          type: Sequelize.STRING
      }, 
      celular_numero: {
          type: Sequelize.STRING
      }
      })*/
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pessoas');
  }
};
