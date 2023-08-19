import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EstadoAttributes {
  id: string;
  codigouf: number;
  nome: string;
  uf: string;
  regiao?: number;
}

export type EstadoPk = "id";
export type EstadoId = Estado[EstadoPk];
export type EstadoOptionalAttributes = "regiao";
export type EstadoCreationAttributes = Optional<EstadoAttributes, EstadoOptionalAttributes>;

export class Estado extends Model<EstadoAttributes, EstadoCreationAttributes> implements EstadoAttributes {
  id!: string;
  codigouf!: number;
  nome!: string;
  uf!: string;
  regiao?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Estado {
    return Estado.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    codigouf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    regiao: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'estados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estados_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
