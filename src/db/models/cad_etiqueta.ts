import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CadEtiquetaAttributes {
  id: number;
  descricao: string;
  ativo?: string;
}

export type CadEtiquetaPk = "id";
export type CadEtiquetaId = CadEtiqueta[CadEtiquetaPk];
export type CadEtiquetaOptionalAttributes = "id" | "ativo";
export type CadEtiquetaCreationAttributes = Optional<CadEtiquetaAttributes, CadEtiquetaOptionalAttributes>;

export class CadEtiqueta extends Model<CadEtiquetaAttributes, CadEtiquetaCreationAttributes> implements CadEtiquetaAttributes {
  id!: number;
  descricao!: string;
  ativo?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof CadEtiqueta {
    return CadEtiqueta.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ativo: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cad_etiquetas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cad_etiquetas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
