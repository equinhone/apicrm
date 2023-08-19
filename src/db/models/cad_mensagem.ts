import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CadMensagemAttributes {
  id: number;
  usuario?: number;
  ativo?: string;
  descricao?: string;
  texto?: string;
  imagem?: any;
  imagemTipo?: string;
  imagemHash?: string;
  botao?: string;
  dtinclusao?: Date;
  dtedicao?: Date;
  dtinativacao?: Date;
  tipo?: string;
  categoria?: number;
}

export type CadMensagemPk = "id";
export type CadMensagemId = CadMensagem[CadMensagemPk];
export type CadMensagemOptionalAttributes = "id" | "usuario" | "ativo" | "descricao" | "texto" | "imagem" | "imagemTipo" | "imagemHash" | "botao" | "dtinclusao" | "dtedicao" | "dtinativacao" | "tipo" | "categoria";
export type CadMensagemCreationAttributes = Optional<CadMensagemAttributes, CadMensagemOptionalAttributes>;

export class CadMensagem extends Model<CadMensagemAttributes, CadMensagemCreationAttributes> implements CadMensagemAttributes {
  id!: number;
  usuario?: number;
  ativo?: string;
  descricao?: string;
  texto?: string;
  imagem?: any;
  imagemTipo?: string;
  imagemHash?: string;
  botao?: string;
  dtinclusao?: Date;
  dtedicao?: Date;
  dtinativacao?: Date;
  tipo?: string;
  categoria?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof CadMensagem {
    return CadMensagem.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ativo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagem: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    imagemTipo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'imagem_tipo'
    },
    imagemHash: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'imagem_hash'
    },
    botao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dtinclusao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtedicao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtinativacao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    categoria: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cad_mensagem',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cad_mensagem_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
