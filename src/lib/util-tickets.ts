import util from "./util";
import { WappArquivo, WappArquivoAttributes } from '../models/wapp_arquivo-model';
import { WappMensagem, WappMensagemAttributes } from '../models/wapp_mensagem-model';
import {Ticket} from '../models/ticket-model'
import { Pessoa } from '../models/pessoa-model';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/db';
import { Op } from 'sequelize';


export async function getTicketId( APessoa:string ){
    let lReturnID;    
    
    try{
        let findTicket = await Ticket.findOne({ 
            attributes: ['id'],
            where: { pessoa: APessoa, 
                     situacao: { [Op.or]: ['A','E'] }
            }
        })
        
        if(findTicket){        
            lReturnID = findTicket.id
        }
        return lReturnID
    } catch (err) {
      console.log(err);
    }    
}

export async function getPessoaId( AWhatsID:string ){
    let lReturnID=0;    
    
    try{
        let findPessoa = await Pessoa.findOne({ 
            //attributes: ['id'],  
            where: { wapp_id: AWhatsID} 
        })
        
        if(findPessoa){        
            lReturnID = findPessoa.id
        }
        return lReturnID
    } catch (err) {
      console.log(err);
    }    
}

export async function getGerarHTMLChat( AId:string, ATicket: string, AOpcao:string) {
    let lProsseguir=false
    let lObjJsonString:string='';
    try{       
        
        
        console.log('Vazioooooooo')            
        

        //let lParam = req.params.situacao;
        
        let lSqlOpcao = '';
        let lSqlOpcaoBasica = "and wm.dtmsg >= (select t.dtabertura from tickets t where t.id="+ATicket+") ";
        let lSqlOrder = 'order by wm.dtmsg';
        let lSqlConsulta='';
        let lSqlBasico = "select wm.* from wapp_mensagem wm "+
                         "where (wm.id_from = "+"'"+ AId +"'"+" or wm.id_to ="+"'"+ AId +"'"+") ";

        if (AOpcao == '0'){            
            lSqlConsulta = lSqlBasico + lSqlOpcaoBasica + lSqlOrder
        }

        if (AOpcao == '1'){                        
            lSqlOpcao = "and wm.dtmsg >= NOW() - INTERVAL '3 DAY' ";
            lSqlConsulta = lSqlBasico + lSqlOpcao + lSqlOrder
        }                

        let results = await sequelize.query(lSqlConsulta,{type: QueryTypes.SELECT})

        //console.log(results.length)
        if(results.length > 0){
            lProsseguir = true;
            lObjJsonString = JSON.stringify(results)             
        }
        
        
        //console.log("Prosseguir: "+lProsseguir)
        //console.log("Objeto: "+lObjJsonString)
        if (lProsseguir){

            
            //util.gravaTxt('_CHAT'+AId,lObjJsonString);
            
            let lObjJson = JSON.parse(lObjJsonString);
            let lId = util.somenteNumeros(AId).toString();
            let lHtmlHead: string = '';
            let lHtmlBody: string = '';
            let lHtmlEnd: string  = '';

            lHtmlHead = '<!DOCTYPE html>';
            lHtmlHead = lHtmlHead + '<html lang="en"> ';
            lHtmlHead = lHtmlHead + '<head> ';
            lHtmlHead = lHtmlHead + '<meta charset="UTF-8"> ';
            lHtmlHead = lHtmlHead + '<title>Whatsapp UI</title> ';
            lHtmlHead = lHtmlHead + '<link rel="stylesheet" href="css/style.css"> ';
            lHtmlHead = lHtmlHead + '</head> ';
            lHtmlHead = lHtmlHead + '<body onload="goTo()" style="background-image: url(css/wa-background.png)" > ';
            lHtmlHead = lHtmlHead + '  <div class="container"> ';
            lHtmlHead = lHtmlHead + '    <div class="chat"> ';
            lHtmlHead = lHtmlHead + '      <div class="chat-box"> ';

            const lDivClassL1 = '<div class="chat-l">';
            const lDivClassL2 = '  <div class="mess">';
            
            const lDivClassR1 = '<div class="chat-r"> ';
            const lDivClassR2 = '  <div class="mess mess-r">'; 


            for(var i in lObjJson) {
                //console.log(lObjJson[i].id);

                    let lIdKey = lObjJson[i].id_key;
                    let lTipo = lObjJson[i].tipo;
                    let lIdWapp = lObjJson[i].id_wapp;
                    let lIdFrom = lObjJson[i].id_from;
                    let lDtMsg = lObjJson[i].dtmsg;//.toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    let lMsg = lObjJson[i].msg;

                    //lMsg = lMsg.replace(/\n/g, "<br />");                   
                    
                    
                    let lCaption = lObjJson[i].caption;
                    let lArquivoPath = '';
                    let lArquivoBase64 = '';
                    let lLongitude=lObjJson[i].longitude;
                    let lLatitude=lObjJson[i].latitude;
                    let lMe = (lIdWapp == lIdFrom);

                    let lResposta_IdKey=lObjJson[i].id_key_resposta;
                    let lResposta_Msg:string='';
                    let lResposta_Tipo:string='';
                    let lResposta_Arquivo:string='';
                    let lResposta_ArquivoBase64:string='';

                    
                    //console.log(lMe)
                    //console.log(lIdKey)
                    //console.log("ID Wpp: "+lIdWapp)
                    //console.log("ID From: "+lIdFrom)
                    //console.log("Tipo: "+lTipo)
                    //console.log(lDtMsg)
                    //console.log(lCaption)
                    //console.log(lArquivoPath)
                    //console.log("ID Resposta: "+lResposta_IdKey)
                    //console.log("-------------") */

                    
                    if (!(lTipo.toUpperCase() == 'LOCATION')){
                        const lResWppArquivo = await WappArquivo.findOne({
                            attributes: ['arquivo_nome', 'arquivo_base64'],
                            where: {
                            id_key: lIdKey
                            }
                        }).then(function (p) {
                            if (p) {                                        
                                let lObjJsonArquivo = JSON.parse(JSON.stringify(p));
                                lArquivoPath = lObjJsonArquivo.arquivo_nome;
                                lArquivoBase64 = lObjJsonArquivo.arquivo_base64;
                            }

                        }).catch(function (err) {
                            console.log('Falha: ' + err);
                        });
                    } 

                    if (lResposta_IdKey){
                        /*console.log("-------------") 
                        console.log("ID Resposta: "+lResposta_IdKey)
                        console.log("-------------") */
                        
                        const lResultWppResp = await WappMensagem.findOne({
                            attributes: ['msg', 'tipo'],
                            where: {
                            id_key: lResposta_IdKey
                            }
                        }).then(async function (p) {
                            if (p) {                                        
                                let lObjJsonWppResposta = JSON.parse(JSON.stringify(p));
                                lResposta_Msg = lObjJsonWppResposta.msg;                            
                                lResposta_Tipo = lObjJsonWppResposta.tipo;
                            }
                            /*console.log("-------------") 
                            console.log("Resposta Tipo: "+lResposta_Tipo)
                            console.log("-------------") */
                            const lResWppREspostaArquivo = await WappArquivo.findOne({
                                attributes: ['arquivo_nome', 'arquivo_base64'],
                                where: {
                                id_key: lResposta_IdKey
                                }
                            }).then(function (p) {
                                if (p) {                                        
                                    let lObjJsonRespArquivo = JSON.parse(JSON.stringify(p));
                                    lResposta_Arquivo       = lObjJsonRespArquivo.arquivo_nome;
                                    lResposta_ArquivoBase64 = lObjJsonRespArquivo.arquivo_base64;
                                }
        
                            }).catch(function (err) {
                                console.log('Falha: ' + err);
                            });

                        }).catch(function (err) {
                            console.log('Falha: ' + err);
                        });

                        
                    }                

                    // Trata se for resposta
                    if (lResposta_Tipo.toUpperCase() == 'CHAT'){
                        lHtmlBody = lHtmlBody + '    <p>' + lResposta_Msg + '</p>';
                        lHtmlBody = lHtmlBody + '    <p><font color="#800080">Resposta =====================</font> </p>';                        
                        lHtmlBody = lHtmlBody + '    <p></p>';
                    }else
                    if (lResposta_Tipo.toUpperCase() == 'IMAGE'){
                        //console.log(lResposta_Tipo.toUpperCase())
                        lHtmlBody = lHtmlBody + '    <p style="background-color: green"><img src="../image/'+ lResposta_Arquivo + '" height="100" width="100"></p>';
                        lHtmlBody = lHtmlBody + '    <p  size="1" style="background-color: white"><font color="#800080">Resposta =====================</font> </p>';                                            
                    }

                    if (lTipo.toUpperCase() == 'DOCUMENT') {
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        lHtmlBody = lHtmlBody + '    <embed src="../doc/' + lArquivoPath + '" width="400" height="400">';
                        //lHtmlBody = lHtmlBody + '<embed src="' + lMsg + '" width="800" height="500">';
                        lHtmlBody = lHtmlBody + ((lCaption) ? '    <p>' + lCaption + '</p>' :'');
                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '      <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div>';
                    }else 
                    if (lTipo.toUpperCase() == 'VIDEO') {
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        //lHtmlBody = lHtmlBody + '    <p><video autoplay controls src="data:video/mp4;base64,' + lArquivoBase64 + '" height="300" width="300">';
                        lHtmlBody = lHtmlBody + '    <p><video autoplay controls src="../video/' + lArquivoPath + '" height="400" width="400">';
                        //lHtmlBody = lHtmlBody + '       <p>The “video” tag is not supported by your browser. Click [here] to download the video file.</p>';
                        lHtmlBody = lHtmlBody + '    </video></p>';
                        
                        lHtmlBody = lHtmlBody + ((lCaption) ? '    <p>' + lCaption + '</p>' :'');
                        
                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '      <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div>';

                    }else 
                    if (lTipo.toUpperCase() == 'PTT') {
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        lHtmlBody = lHtmlBody + '    <p><audio controls="controls" autobuffer="autobuffer" autoplay="autoplay">';
                        //lHtmlBody = lHtmlBody + '      <source src="data:audio/ogg;base64,' + lMsg + '" />';
                        lHtmlBody = lHtmlBody + '      <source src="../audio/' + lArquivoPath + '" />';
                        lHtmlBody = lHtmlBody + '    </audio></p>';
                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '     <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div>';

                    }else 
                    if (lTipo.toUpperCase() == 'IMAGE') {                   
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        //lHtmlBody = lHtmlBody + '    <p><img src="data:image/png;base64,' + lArquivoBase64 + '" height="400" width="300"></p>';                    
                        lHtmlBody = lHtmlBody + '    <p><img src="../image/'+ lArquivoPath + '" height="400" width="400"></p>';
                        lHtmlBody = lHtmlBody + ((lCaption) ? '    <p>' + lCaption + '</p>' :'');
                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '      <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div>';

                    }else 
                    if (lTipo.toUpperCase() == 'LOCATION') {                   
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        lHtmlBody = lHtmlBody + '    <p>'; 
                        lHtmlBody = lHtmlBody + '      <a href="https://www.google.com/maps?q='+ lLongitude+','+lLatitude+'&z=17&hl=pt-BR" target="_blank">';
                        lHtmlBody = lHtmlBody + '      <img src="data:image/png;base64,' + lMsg + '" height="200" width="200"></a>';
                        lHtmlBody = lHtmlBody + '    </p>';                        
                        lHtmlBody = lHtmlBody + '    <p><a href="https://www.google.com/maps?q='+ lLongitude+','+lLatitude+'&z=17&hl=pt-BR" target="_blank">Abrir Localização</a></p>';                        

                        lHtmlBody = lHtmlBody + ((lCaption) ? '    <p>' + lCaption + '</p>' :'');

                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '      <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div>';

                    }
                    else if (lTipo.toUpperCase() == 'CHAT') {
                        
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR1) : (lDivClassL1));
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? ' <div class="sp"></div>' : '');
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? (lDivClassR2) : (lDivClassL2));
                        lHtmlBody = lHtmlBody + '    <p>' + lMsg + '</p>';
                        lHtmlBody = lHtmlBody + '    <div class="check">';
                        lHtmlBody = lHtmlBody + '      <span>' + lDtMsg + '</span>';
                        lHtmlBody = lHtmlBody + '    </div>';
                        lHtmlBody = lHtmlBody + '  </div>';
                        lHtmlBody = lHtmlBody + ((lIdWapp == lIdFrom) ? '' : ' <div class="sp"></div>');
                        lHtmlBody = lHtmlBody + '</div> ';
                    }
            }
            
            lHtmlEnd = '                 </div>';
            lHtmlEnd = lHtmlEnd + '    </div>';
            lHtmlEnd = lHtmlEnd + '  </div>';

            lHtmlEnd = lHtmlEnd + '  <script>';
            lHtmlEnd = lHtmlEnd + '    function goTo(){';
            lHtmlEnd = lHtmlEnd + '      var heightPage = document.body.scrollHeight;';
            lHtmlEnd = lHtmlEnd + '      setTimeout(function () {';
            lHtmlEnd = lHtmlEnd + '        window.scrollTo(0, heightPage);';
            lHtmlEnd = lHtmlEnd + '      },2);';
            lHtmlEnd = lHtmlEnd + '    }';
            lHtmlEnd = lHtmlEnd + '  </script>';

            lHtmlEnd = lHtmlEnd + '</body>';
            lHtmlEnd = lHtmlEnd + '</html>';

            //console.log(lHtml);
            //console.log(lHtmlBody);
            let lHtml = lHtmlHead + lHtmlBody + lHtmlEnd;

            util.gravaHTML("Chat"+lId, lHtml);
        }
    } 
    catch (error) {
        console.log(error);        
    }
}

export default {
    getPessoaId,
    getTicketId,
    getGerarHTMLChat
}