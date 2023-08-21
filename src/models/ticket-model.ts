import moment from 'moment';
import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TicketAttributes extends Model {
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

export const Ticket = sequelize.define<TicketAttributes>('Ticket', {
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
      allowNull: true,
      get() {
        const dateText = this.getDataValue('dtultimamsg');
        return moment(dateText).format('YYYY-MM-DD HH:mm:ss');
    }
    },
    dtatendimento: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const dateText = this.getDataValue('dtatendimento');
        return moment(dateText).format('YYYY-MM-DD HH:mm:ss');
    }
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

export default ({Ticket})
