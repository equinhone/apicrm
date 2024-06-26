import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PessoaAttributes {
  id: number;
  usuario?: number;
  nome?: string;
  fantasia?: string;
  apelido?: string;
  tipo?: string;
  ativo?: string;
  foto?: string;
  enviarmsg?: string;
  cnpj?: string;
  ie?: string;
  endereco?: string;
  enderecoNumero?: string;
  enderecoBairro?: string;
  enderecoCidade?: number;
  enderecoCep?: string;
  enderecoUf?: string;
  enderecoComp?: string;
  fone?: string;
  celular?: string;
  email?: string;
  site?: string;
  dtinclusao?: Date;
  dtedicao?: Date;
  dtinativacao?: Date;
  dtultimopedido?: Date;
  dtimportacao?: Date;
  wappId?: string;
  blingId?: string;
  pessoaCliente?: string;
  pessoaFornecedor?: string;
  pessoaTransportador?: string;
  pessoaVendedor?: string;
  pessoaLead?: string;
  pessoaFuncionario?: string;
  pessoaRevenda?: string;
  celularDdi?: string;
  celularDdd?: string;
  celularNumero?: string;
  amezap_id?:string;
  estrangeiro?:string;
}

export type PessoaPk = "id";
export type PessoaId = Pessoa[PessoaPk];
export type PessoaOptionalAttributes = "id" | "usuario" | "nome" | "fantasia" | "apelido" | "tipo" | "ativo" | "foto" | "enviarmsg" | "cnpj" | "ie" | 
                                       "endereco" | "enderecoNumero" | "enderecoBairro" | "enderecoCidade" | "enderecoCep" | "enderecoUf" | "enderecoComp" | 
                                       "fone" | "celular" | "email" | "site" | "dtinclusao" | "dtedicao" | "dtinativacao" | "dtultimopedido" | "dtimportacao" | 
                                       "wappId" | "blingId" | "pessoaCliente" | "pessoaFornecedor" | "pessoaTransportador" | "pessoaVendedor" | "pessoaLead" | 
                                       "pessoaFuncionario" | "pessoaRevenda" | "celularDdi" | "celularDdd" | "celularNumero" | "amezap_id" | "estrangeiro";

export type PessoaCreationAttributes = Optional<PessoaAttributes, PessoaOptionalAttributes>;

export class Pessoa extends Model<PessoaAttributes, PessoaCreationAttributes> implements PessoaAttributes {
  id!: number;
  usuario?: number;
  nome?: string;
  fantasia?: string;
  apelido?: string;
  tipo?: string;
  ativo?: string;
  foto?: string;
  enviarmsg?: string;
  cnpj?: string;
  ie?: string;
  endereco?: string;
  enderecoNumero?: string;
  enderecoBairro?: string;
  enderecoCidade?: number;
  enderecoCep?: string;
  enderecoUf?: string;
  enderecoComp?: string;
  fone?: string;
  celular?: string;
  email?: string;
  site?: string;
  dtinclusao?: Date;
  dtedicao?: Date;
  dtinativacao?: Date;
  dtultimopedido?: Date;
  dtimportacao?: Date;
  wappId?: string;
  blingId?: string;
  pessoaCliente?: string;
  pessoaFornecedor?: string;
  pessoaTransportador?: string;
  pessoaVendedor?: string;
  pessoaLead?: string;
  pessoaFuncionario?: string;
  pessoaRevenda?: string;
  celularDdi?: string;
  celularDdd?: string;
  celularNumero?: string;
  amezap_id?:string;
  estrangeiro?:string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Pessoa {
    return Pessoa.init({
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fantasia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apelido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ativo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enviarmsg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    cnpj: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ie: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    enderecoNumero: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'endereco_numero'
    },
    enderecoBairro: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'endereco_bairro'
    },
    enderecoCidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'endereco_cidade'
    },
    enderecoCep: {
      type: DataTypes.STRING(8),
      allowNull: true,
      field: 'endereco_cep'
    },
    enderecoUf: {
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'endereco_uf'
    },
    enderecoComp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'endereco_comp'
    },
    fone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    site: {
      type: DataTypes.STRING(255),
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
    dtultimopedido: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtimportacao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    wappId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'wapp_id'
    },
    blingId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'bling_id'
    },
    pessoaCliente: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_cliente'
    },
    pessoaFornecedor: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_fornecedor'
    },
    pessoaTransportador: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_transportador'
    },
    pessoaVendedor: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_vendedor'
    },
    pessoaLead: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_lead'
    },
    pessoaFuncionario: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_funcionario'
    },
    pessoaRevenda: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'pessoa_revenda'
    },
    celularDdi: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'celular_ddi'
    },
    celularDdd: {
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'celular_ddd'
    },
    celularNumero: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'celular_numero'
    },
    amezap_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'amezap_id'
    },
    estrangeiro: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'estrangeiro'
    }

  }, {
    sequelize,
    tableName: 'pessoas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pessoas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
