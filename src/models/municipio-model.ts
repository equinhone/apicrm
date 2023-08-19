import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MunicipioAttributes extends Model {
  id: number;
  codigo: number;
  nome: string;
  uf: string;
}

export const Municipio = sequelize.define<MunicipioAttributes>('Municipo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false
    }
  }, {
    
    tableName: 'municipios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "municipios_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "codigo" },
        ]
      },
    ]
  });

export default ({Municipio})

