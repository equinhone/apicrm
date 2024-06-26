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
        ,defaultValue: 'S'
    }, 
    cnpj: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    ie: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco_numero: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco_bairro: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco_cidade: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco_cep: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    endereco_uf: {
        type: DataTypes.STRING
        ,defaultValue: null
    },
    endereco_comp: {
        type: DataTypes.STRING
        ,defaultValue: null
    },
    fone: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    celular: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    email: {
        type: DataTypes.STRING
    }, 
    site: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    dtinclusao: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    }, 
    dtedicao: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    dtinativacao: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    dtultimopedido: {
        type: DataTypes.STRING,
        defaultValue: null
    }, 
    dtimportacao: {
        type: DataTypes.STRING,
        defaultValue: null
    }, 
    wapp_id: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    wapp_valido: {
        type: DataTypes.STRING
        ,defaultValue: 'N'
    },  
    bling_id: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    pessoa_cliente: {
        type: DataTypes.STRING,
        defaultValue: "N",
    }, 
    pessoa_fornecedor: {
        type: DataTypes.STRING,
        defaultValue: "N"
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
        ,defaultValue: null
    }, 
    celular_ddd: {
        type: DataTypes.STRING
        ,defaultValue: null
    }, 
    celular_numero: {
        type: DataTypes.STRING
        ,defaultValue: null
    },    
    amezap_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'amezap_id',
        defaultValue: null

    },
    estrangeiro: {
        type: DataTypes.STRING(1),
        allowNull: true,
        field: 'estrangeiro',
        defaultValue: 'N'
    }
}, {
    tableName: 'pessoas',
    timestamps: false
})

export default ({Pessoa})