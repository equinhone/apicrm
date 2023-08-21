import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export interface PessoaInterface extends Model {
    id: number;
    usuario: number;
    nome: string;
    fantasia: string;
    dtinclusao:Date;
    dtedicao:Date;
}


export const Pessoa = sequelize.define<PessoaInterface>('Pessoa', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    usuario: {
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,

    },
    fantasia: {
        type: DataTypes.STRING
    },    
    apelido: {
        type: DataTypes.STRING
    }, 
    tipo: {
        type: DataTypes.STRING
    }, 
    ativo: {
        type: DataTypes.STRING
    }, 
    //foto: {
    //    type: DataTypes.STRING
    //}, 
    enviarmsg: {
        type: DataTypes.STRING
    }, 
    cnpj: {
        type: DataTypes.STRING
    }, 
    ie: {
        type: DataTypes.STRING
    }, 
    endereco: {
        type: DataTypes.STRING
    }, 
    endereco_numero: {
        type: DataTypes.STRING
    }, 
    endereco_bairro: {
        type: DataTypes.STRING
    }, 
    endereco_cidade: {
        type: DataTypes.STRING
    }, 
    endereco_cep: {
        type: DataTypes.STRING
    }, 
    endereco_uf: {
        type: DataTypes.STRING
    },
    endereco_comp: {
        type: DataTypes.STRING
    },
    fone: {
        type: DataTypes.STRING
    }, 
    celular: {
        type: DataTypes.STRING
    }, 
    email: {
        type: DataTypes.STRING
    }, 
    site: {
        type: DataTypes.STRING
    }, 
    dtinclusao: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    }, 
    dtedicao: {
        type: DataTypes.STRING
    }, 
    dtinativacao: {
        type: DataTypes.STRING
    }, 
    dtultimopedido: {
        type: DataTypes.STRING
    }, 
    dtimportacao: {
        type: DataTypes.STRING
    }, 
    wapp_id: {
        type: DataTypes.STRING
    }, 
    bling_id: {
        type: DataTypes.STRING
    }, 
    pessoa_cliente: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_fornecedor: {
        type: DataTypes.STRING,
        defaultValue: "N",

    }, 
    pessoa_transportador: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_vendedor: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_lead: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_funcionario: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_revenda: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    celular_ddi: {
        type: DataTypes.STRING
    }, 
    celular_ddd: {
        type: DataTypes.STRING
    }, 
    celular_numero: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'pessoas',
    timestamps: false
})

export default ({Pessoa})