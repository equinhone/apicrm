import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WappMensagemAttributes {
  id: number;
  idWapp: string;
  idKey?: string;
  idFrom?: string;
  idTo?: string;
  dtmsg?: Date;
  nome?: string;
  msg?: string;
  caption?: string;
  tipo?: string;
  longitude?: string;
  latitude?: string;
  statusMensagem?: number;
  mensagempadrao?: number;
  dtstatus?: Date;
  statusEnvio?: number;
  statusEnvioMsg?: string;
  dtstatusEnvio?: Date;
  botoes?: string;
}

export type WappMensagemPk = "id" | "idWapp";
export type WappMensagemId = WappMensagem[WappMensagemPk];
export type WappMensagemOptionalAttributes = "id" | "idKey" | "idFrom" | "idTo" | "dtmsg" | "nome" | "msg" | "caption" | "tipo" | "longitude" | "latitude" | "statusMensagem" | "mensagempadrao" | "dtstatus" | "statusEnvio" | "statusEnvioMsg" | "dtstatusEnvio" | "botoes";
export type WappMensagemCreationAttributes = Optional<WappMensagemAttributes, WappMensagemOptionalAttributes>;

export class WappMensagem extends Model<WappMensagemAttributes, WappMensagemCreationAttributes> implements WappMensagemAttributes {
  id!: number;
  idWapp!: string;
  idKey?: string;
  idFrom?: string;
  idTo?: string;
  dtmsg?: Date;
  nome?: string;
  msg?: string;
  caption?: string;
  tipo?: string;
  longitude?: string;
  latitude?: string;
  statusMensagem?: number;
  mensagempadrao?: number;
  dtstatus?: Date;
  statusEnvio?: number;
  statusEnvioMsg?: string;
  dtstatusEnvio?: Date;
  botoes?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof WappMensagem {
    return WappMensagem.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idWapp: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: 'id_wapp'
    },
    idKey: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'id_key'
    },
    idFrom: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'id_from'
    },
    idTo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'id_to'
    },
    dtmsg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    statusMensagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status_mensagem'
    },
    mensagempadrao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dtstatus: {
      type: DataTypes.DATE,
      allowNull: true
    },
    statusEnvio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status_envio'
    },
    statusEnvioMsg: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'status_envio_msg'
    },
    dtstatusEnvio: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dtstatus_envio'
    },
    botoes: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wapp_mensagem',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wapp_mensagem_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "id_wapp" },
        ]
      },
    ]
  });
  }
}
