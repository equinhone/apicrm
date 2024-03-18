import moment from 'moment';
import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CampanhaAttributes extends Model {
  id: number;
  usuario?: number;
  nome: string;
  tipo?: string;
  dtagendamento: Date;
  dtinclusao?: Date;
  dtedicao?: Date;
  dtinativacao?: Date;
  id_cad_mensagem?:number
}

export const Campanha = sequelize.define<CampanhaAttributes>('Campanhas', {
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
    nome: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    dtagendamento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtinclusao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtedicao: {
        type: DataTypes.DATE,
        allowNull: true
      },
    dtinativacao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_cad_mensagem: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    
  }, {
    tableName: 'campanhas',
    schema: 'public',
    timestamps: false,    
    indexes: [
      {
        name: "campanhas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
});

export default ({Campanha})
