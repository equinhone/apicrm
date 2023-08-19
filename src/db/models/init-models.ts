import type { Sequelize } from "sequelize";
import { CadEtiqueta as _CadEtiqueta } from "./cad_etiqueta";
import type { CadEtiquetaAttributes, CadEtiquetaCreationAttributes } from "./cad_etiqueta";
import { CadMensagem as _CadMensagem } from "./cad_mensagem";
import type { CadMensagemAttributes, CadMensagemCreationAttributes } from "./cad_mensagem";
import { Estado as _Estado } from "./estado";
import type { EstadoAttributes, EstadoCreationAttributes } from "./estado";
import { Municipio as _Municipio } from "./municipio";
import type { MunicipioAttributes, MunicipioCreationAttributes } from "./municipio";
import { Pessoa as _Pessoa } from "./pessoa";
import type { PessoaAttributes, PessoaCreationAttributes } from "./pessoa";
import { PessoasEtiqueta as _PessoasEtiqueta } from "./pessoas_etiqueta";
import type { PessoasEtiquetaAttributes, PessoasEtiquetaCreationAttributes } from "./pessoas_etiqueta";
import { Ticket as _Ticket } from "./ticket";
import type { TicketAttributes, TicketCreationAttributes } from "./ticket";
import { TicketsIgnorado as _TicketsIgnorado } from "./tickets_ignorado";
import type { TicketsIgnoradoAttributes, TicketsIgnoradoCreationAttributes } from "./tickets_ignorado";
import { WappArquivo as _WappArquivo } from "./wapp_arquivo";
import type { WappArquivoAttributes, WappArquivoCreationAttributes } from "./wapp_arquivo";
import { WappContato as _WappContato } from "./wapp_contato";
import type { WappContatoAttributes, WappContatoCreationAttributes } from "./wapp_contato";
import { WappKey as _WappKey } from "./wapp_key";
import type { WappKeyAttributes, WappKeyCreationAttributes } from "./wapp_key";
import { WappMensagem as _WappMensagem } from "./wapp_mensagem";
import type { WappMensagemAttributes, WappMensagemCreationAttributes } from "./wapp_mensagem";

export {
  _CadEtiqueta as CadEtiqueta,
  _CadMensagem as CadMensagem,
  _Estado as Estado,
  _Municipio as Municipio,
  _Pessoa as Pessoa,
  _PessoasEtiqueta as PessoasEtiqueta,
  _Ticket as Ticket,
  _TicketsIgnorado as TicketsIgnorado,
  _WappArquivo as WappArquivo,
  _WappContato as WappContato,
  _WappKey as WappKey,
  _WappMensagem as WappMensagem,
};

export type {
  CadEtiquetaAttributes,
  CadEtiquetaCreationAttributes,
  CadMensagemAttributes,
  CadMensagemCreationAttributes,
  EstadoAttributes,
  EstadoCreationAttributes,
  MunicipioAttributes,
  MunicipioCreationAttributes,
  PessoaAttributes,
  PessoaCreationAttributes,
  PessoasEtiquetaAttributes,
  PessoasEtiquetaCreationAttributes,
  TicketAttributes,
  TicketCreationAttributes,
  TicketsIgnoradoAttributes,
  TicketsIgnoradoCreationAttributes,
  WappArquivoAttributes,
  WappArquivoCreationAttributes,
  WappContatoAttributes,
  WappContatoCreationAttributes,
  WappKeyAttributes,
  WappKeyCreationAttributes,
  WappMensagemAttributes,
  WappMensagemCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const CadEtiqueta = _CadEtiqueta.initModel(sequelize);
  const CadMensagem = _CadMensagem.initModel(sequelize);
  const Estado = _Estado.initModel(sequelize);
  const Municipio = _Municipio.initModel(sequelize);
  const Pessoa = _Pessoa.initModel(sequelize);
  const PessoasEtiqueta = _PessoasEtiqueta.initModel(sequelize);
  const Ticket = _Ticket.initModel(sequelize);
  const TicketsIgnorado = _TicketsIgnorado.initModel(sequelize);
  const WappArquivo = _WappArquivo.initModel(sequelize);
  const WappContato = _WappContato.initModel(sequelize);
  const WappKey = _WappKey.initModel(sequelize);
  const WappMensagem = _WappMensagem.initModel(sequelize);


  return {
    CadEtiqueta: CadEtiqueta,
    CadMensagem: CadMensagem,
    Estado: Estado,
    Municipio: Municipio,
    Pessoa: Pessoa,
    PessoasEtiqueta: PessoasEtiqueta,
    Ticket: Ticket,
    TicketsIgnorado: TicketsIgnorado,
    WappArquivo: WappArquivo,
    WappContato: WappContato,
    WappKey: WappKey,
    WappMensagem: WappMensagem,
  };
}
