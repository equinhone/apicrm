import moment from 'moment';
import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CampanhasPessoasAttributes extends Model {
  id: number;
  id_campanhas?: number;  
  id_pessoas?: number;
  id_key?: string;
  dtenvio?: Date;
  wapp_id?:string;
  ret_id?:number;
  ret_msg?:string;
}

export const CampanhasPessoas = sequelize.define<CampanhasPessoasAttributes>('campanhas_pessoas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },       
    id_campanhas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_pessoas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_key: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
    dtenvio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    wapp_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ret_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ret_msg: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }

    
    
  }, {
    tableName: 'campanhas_pessoas',
    schema: 'public',
    timestamps: false,    
    indexes: [
      {
        name: "campanhas_pessoas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
});

export default ({CampanhasPessoas})
