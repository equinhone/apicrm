import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PessoasEtiquetaAttributes {
  pessoa: number;
  etiqueta: number;
}

export type PessoasEtiquetaCreationAttributes = PessoasEtiquetaAttributes;

export class PessoasEtiqueta extends Model<PessoasEtiquetaAttributes, PessoasEtiquetaCreationAttributes> implements PessoasEtiquetaAttributes {
  pessoa!: number;
  etiqueta!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof PessoasEtiqueta {
    return PessoasEtiqueta.init({
    pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etiqueta: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pessoas_etiquetas',
    schema: 'public',
    timestamps: false
  });
  }
}
