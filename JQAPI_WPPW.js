/*

function incluiBiblioteca(arqvJs){
  var scrp = document.createElement("script");
  scrp.src = arqvJs;
  document.head.appendChild(scrp);
}
var jqcdn = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
incluiBiblioteca(jqcdn);

*/

class ChatListener{
  setAtivo(){
    this.FORM_WEB = $("div#app").find("div#main");
    this.CABECALHO = this.FORM_WEB.find("header");
    this._CHAT_USER_IMG = this.CABECALHO.find("img");
    this._CHAT_USERNAME = this.CABECALHO.find("div div div span[dir='auto']").attr("title");
    if(this._CHAT_USERNAME == undefined) {
      console.error("ChatListener","Não existe usuário ativo. Tente novamente.");
      return; 
    }
    this.USER_CHAT_SCR_TYPE = this.FORM_WEB.find("footer div div div.copyable-text.selectable-text")[0];
    this.USER_CHAT_AREA = this.FORM_WEB.find("div[tabindex='0']").find("div[data-tab='2']");
    console.log("ChatListener has set to '" + this._CHAT_USERNAME + "'");

    this.USER_CHAT_AREA.on('DOMSubtreeModified', (e)=>this.__evt_chatChange(e));
  }
  
  unset(){
    this.USER_CHAT_AREA.off('DOMSubtreeModified');
  }

  __evt_chatChange(e){
    if(e.target == this.USER_CHAT_AREA[0]){
      if (!this.decodeMessage(0).recebido){
        setTimeout(()=>{
          console.log("Respondendo à "+this.decodeMessage(0).msg);
          this.sendMsg( this.decodeMessage(0).msg+"." );
        }, 200);
        
      }
    }
  }

  clearMessage(){
    this.USER_CHAT_SCR_TYPE.textContent='';
  }

  addMessage(msg){
    this.USER_CHAT_SCR_TYPE.focus();
    document.execCommand("insertHTML", false, msg);
  }
  send(){
    this.USER_CHAT_BTN_SEND = this.FORM_WEB.find("footer div.copyable-area").find("div button span[data-icon='send']").parent()[0];
    this.USER_CHAT_BTN_SEND.click();
  }
  sendMsg(msg){
    this.clearMessage();
    this.addMessage(msg);
    this.send();
  }

  chatDivMessages(){
    var a = [];
    this.USER_CHAT_AREA.children().each((id,e)=>{a.push(e);})
    return a.reverse();
  }

  __extractContent(span){
    var strMsg = ""
    var itms = span.contents()
    for(let itm of itms){
      strMsg+= (itm.nodeName == "#text" ? itm.textContent :
       (itm.nodeName == "IMG" ? itm.alt :
        (itm.nodeName == "A" ? itm.href :
          ("(DESCONHECIDO: "+itm.nodeName+")")
        )
       )
      )
    }
    return strMsg
  }

  decodeMessage(id){
    let messgs = this.chatDivMessages();
    if( id >= messgs.length ) return -1; // Id inexistente
    var recebido = !($(messgs[id]).hasClass("message-out"));
    var hora = $(messgs[id]).find('span[dir="auto"]').last().html()

    var trechos = $(messgs[id]).find('div.copyable-text').children();
    var respondendo = -1;
    for(var trecho of trechos){
      var isRepl = $(trecho).find(".quoted-mention").length > 0;
      if(isRepl){
        var respMsg = this.__extractContent( $(trecho).find(".quoted-mention") );
        for(var i=id+1; i < messgs.length; i++){
          var itm = this.decodeMessage(i);
          if(itm.msg == respMsg){
            respondendo = i;
            break;
         }
        }
      }
    }

    var span = trechos.last().find('.selectable-text.invisible-space.copyable-text').find('span');
    var strMsg = this.__extractContent(span);
  
    return {
      recebido: recebido,
      msg: strMsg,
      time: hora,
      idReply: respondendo,
      objeto: messgs[id]
    }
  }
}
// var a = new ChatListener(); a.setAtivo(); a.decodeMessage(0); a.chatDivMessages();