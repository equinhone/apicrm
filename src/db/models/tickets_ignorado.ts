import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TicketsIgnoradoAttributes {
  id: number;
  pessoa: number;
  dtinclusao?: Date;
}

export type TicketsIgnoradoPk = "id";
export type TicketsIgnoradoId = TicketsIgnorado[TicketsIgnoradoPk];
export type TicketsIgnoradoOptionalAttributes = "id" | "dtinclusao";
export type TicketsIgnoradoCreationAttributes = Optional<TicketsIgnoradoAttributes, TicketsIgnoradoOptionalAttributes>;

export class TicketsIgnorado extends Model<TicketsIgnoradoAttributes, TicketsIgnoradoCreationAttributes> implements TicketsIgnoradoAttributes {
  id!: number;
  pessoa!: number;
  dtinclusao?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof TicketsIgnorado {
    return TicketsIgnorado.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dtinclusao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tickets_ignorados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tickets_ignorados_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
