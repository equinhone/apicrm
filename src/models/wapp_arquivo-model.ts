import { sequelize } from '../db/db';
import { DataTypes, Model } from 'sequelize';

export interface WappArquivoAttributes extends Model {
  id: number;
  idKey: string;
  arquivo?: any;
  arquivoNome?: string;
  arquivoTipo?: string;
  arquivoBase64?: string;
  arquivoPath?: string;
}
export const WappArquivo = sequelize.define<WappArquivoAttributes>('WappArquivo', {  
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
