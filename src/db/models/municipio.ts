import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MunicipioAttributes {
  id: number;
  codigo: number;
  nome: string;
  uf: string;
}

export type MunicipioPk = "id" | "codigo";
export type MunicipioId = Municipio[MunicipioPk];
export type MunicipioCreationAttributes = MunicipioAttributes;

export class Municipio extends Model<MunicipioAttributes, MunicipioCreationAttributes> implements MunicipioAttributes {
  id!: number;
  codigo!: number;
  nome!: string;
  uf!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Municipio {
    return Municipio.init({
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
    sequelize,
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
  }
}
