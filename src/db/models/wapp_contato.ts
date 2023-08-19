import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WappContatoAttributes {
  id: string;
  dtmsg?: Date;
  nome?: string;
  shortname?: string;
  pushname?: string;
  verifiedname?: string;
  formatedname?: string;
  celular?: string;
  foto?: string;
  contato?: string;
  grupo?: string;
  icone?: string;
  qtdemsg?: number;
  msgnova?: string;
}

export type WappContatoPk = "id";
export type WappContatoId = WappContato[WappContatoPk];
export type WappContatoOptionalAttributes = "dtmsg" | "nome" | "shortname" | "pushname" | "verifiedname" | "formatedname" | "celular" | "foto" | "contato" | "grupo" | "icone" | "qtdemsg" | "msgnova";
export type WappContatoCreationAttributes = Optional<WappContatoAttributes, WappContatoOptionalAttributes>;

export class WappContato extends Model<WappContatoAttributes, WappContatoCreationAttributes> implements WappContatoAttributes {
  id!: string;
  dtmsg?: Date;
  nome?: string;
  shortname?: string;
  pushname?: string;
  verifiedname?: string;
  formatedname?: string;
  celular?: string;
  foto?: string;
  contato?: string;
  grupo?: string;
  icone?: string;
  qtdemsg?: number;
  msgnova?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof WappContato {
    return WappContato.init({
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    dtmsg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shortname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pushname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verifiedname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    formatedname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contato: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    grupo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    icone: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    qtdemsg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    msgnova: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wapp_contatos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wapp_contatos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
