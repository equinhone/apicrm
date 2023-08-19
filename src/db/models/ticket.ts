import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TicketAttributes {
  id: number;
  usuario?: number;
  pessoa: number;
  situacao?: string;
  dtabertura?: Date;
  dtfechamento?: Date;
  dtultimamsg?: Date;
  dtatendimento?: Date;
  dtcancelamento?: Date;
  motivoCancelamento?: string;
}

export type TicketPk = "id";
export type TicketId = Ticket[TicketPk];
export type TicketOptionalAttributes = "id" | "usuario" | "situacao" | "dtabertura" | "dtfechamento" | "dtultimamsg" | "dtatendimento" | "dtcancelamento" | "motivoCancelamento";
export type TicketCreationAttributes = Optional<TicketAttributes, TicketOptionalAttributes>;

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  id!: number;
  usuario?: number;
  pessoa!: number;
  situacao?: string;
  dtabertura?: Date;
  dtfechamento?: Date;
  dtultimamsg?: Date;
  dtatendimento?: Date;
  dtcancelamento?: Date;
  motivoCancelamento?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Ticket {
    return Ticket.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    situacao: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    dtabertura: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtfechamento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtultimamsg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtatendimento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtcancelamento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    motivoCancelamento: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'motivo_cancelamento'
    }
  }, {
    sequelize,
    tableName: 'tickets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tickets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
