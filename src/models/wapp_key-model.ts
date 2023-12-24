import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WappKeyAttributes extends Model  {
  id: number;
  idKey: string;
  ack?: number;
  msgJson?: object;
  dtmsg?: Date;
  origem?: string;
}

export const WappKey = sequelize.define<WappKeyAttributes>('WappKey', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idKey: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'id_key'
    },
    ack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    msgJson: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'msg_json'
    },
    dtmsg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    origem: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {    
    tableName: 'wapp_key',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wapp_key_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

