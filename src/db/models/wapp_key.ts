import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WappKeyAttributes {
  id: number;
  idKey: string;
  ack?: number;
  msgJson?: object;
  dtmsg?: Date;
  origem?: string;
}

export type WappKeyPk = "id";
export type WappKeyId = WappKey[WappKeyPk];
export type WappKeyOptionalAttributes = "id" | "ack" | "msgJson" | "dtmsg" | "origem";
export type WappKeyCreationAttributes = Optional<WappKeyAttributes, WappKeyOptionalAttributes>;

export class WappKey extends Model<WappKeyAttributes, WappKeyCreationAttributes> implements WappKeyAttributes {
  id!: number;
  idKey!: string;
  ack?: number;
  msgJson?: object;
  dtmsg?: Date;
  origem?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof WappKey {
    return WappKey.init({
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
    sequelize,
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
  }
}
