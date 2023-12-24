import { INTEGER } from '@sequelize/core/types/dialects/abstract/data-types';
import sequelizeWpp from '../db/dbwpp';
import { DataTypes, Model } from 'sequelize';

export interface MensagemAttributes extends Model {
  id: number;
  body:String;  
  ack:INTEGER;
  read:String; 
  mediaType:String;
  mediaUrl:String;
  ticketId:INTEGER;  
  createdAt:Date;
  updatedAt:Date;
  fromMe:String;
  isDeleted:Boolean;
  contactId:String;
  quotedMsgId:String;
  companyId:String;
  remoteJid :String;
  dataJson:String;
  nome:String;
  celular:String; 
  readcrm:String;
  wpp:String; 
}

export const Mensagem = sequelizeWpp.define<MensagemAttributes>('Mensagem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'body'
    },
    readcrm: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'readcrm'
    },

    
  }, {
    tableName: 'Messages',
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Messages_pkey",
        unique: true,
        fields: [
          { name: "id" }
        ]
      },
    ]
  });

  export default ({Mensagem})