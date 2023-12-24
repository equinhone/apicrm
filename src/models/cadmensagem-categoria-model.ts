import { sequelize } from '../db/db';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CadMensagemCategoriaAttributes extends Model{
  id: number;
  descricao?: string;  
}

export const CadMensagemCategoria = sequelize.define<CadMensagemCategoriaAttributes>('CadMensagemCategoria', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: true
    }    
  }, {

    tableName: 'cad_mensagem_categoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cad_mensagem_categoria_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
});

export default ({CadMensagemCategoria})