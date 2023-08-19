import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WappArquivoAttributes {
  id: number;
  idKey: string;
  arquivo?: any;
  arquivoNome?: string;
  arquivoTipo?: string;
  arquivoBase64?: string;
  arquivoPath?: string;
}

export type WappArquivoPk = "id" | "idKey";
export type WappArquivoId = WappArquivo[WappArquivoPk];
export type WappArquivoOptionalAttributes = "id" | "arquivo" | "arquivoNome" | "arquivoTipo" | "arquivoBase64" | "arquivoPath";
export type WappArquivoCreationAttributes = Optional<WappArquivoAttributes, WappArquivoOptionalAttributes>;

export class WappArquivo extends Model<WappArquivoAttributes, WappArquivoCreationAttributes> implements WappArquivoAttributes {
  id!: number;
  idKey!: string;
  arquivo?: any;
  arquivoNome?: string;
  arquivoTipo?: string;
  arquivoBase64?: string;
  arquivoPath?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof WappArquivo {
    return WappArquivo.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idKey: {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true,
      field: 'id_key'
    },
    arquivo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    arquivoNome: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'arquivo_nome'
    },
    arquivoTipo: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'arquivo_tipo'
    },
    arquivoBase64: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'arquivo_base64'
    },
    arquivoPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'arquivo_path'
    }
  }, {
    sequelize,
    tableName: 'wapp_arquivos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "wapp_arquivos_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "id_key" },
        ]
      },
    ]
  });
  }
}
