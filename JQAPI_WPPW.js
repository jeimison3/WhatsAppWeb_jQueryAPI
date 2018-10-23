/*

function incluiBiblioteca(arqvJs){
  var scrp = document.createElement("script");
  scrp.src = arqvJs;
  document.head.appendChild(scrp);
}
var jqcdn = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
incluiBiblioteca(jqcdn);

*/


var ChatListener = function(){
  this.FORM_WEB = $("div#app").find("div#main");
  this.CABECALHO = this.FORM_WEB.find("header");
  this._CHAT_USER_IMG = this.CABECALHO.find("img");
  this._CHAT_USERNAME = this.CABECALHO.find("div div div span[dir='auto']").attr("title");
  this.USER_CHAT_SCR_TYPE = this.FORM_WEB.find("footer div div div.copyable-text.selectable-text")[0];
  //this.USER_CHAT_SCR_TYPE = this.USER_CHAT_SCR.children[this.USER_CHAT_SCR_COUNT-2].children[0].children[1].children[0].children[1];

  this.USER_CHAT_AREA = this.FORM_WEB.find("div.copyable-area").find("div[tabindex='0']");
  this.USER_CHAT_AREA = this.USER_CHAT_AREA.children().last();


  console.log("ChatListener has set to '" + this._CHAT_USERNAME + "'");
}


// Acesso de atributos

ChatListener.prototype.chatName = function(){
  return this._CHAT_USERNAME;
};

ChatListener.prototype.receiveDivsMessages = function(){
  var a = [];
  this.USER_CHAT_AREA.children().each((id,e)=>{a.push(e);})
  return a;
};



// Ações:

ChatListener.prototype.clearMessage = function(){
  this.USER_CHAT_SCR_TYPE.textContent='';
};

ChatListener.prototype.addMessage = function(msg){
  this.USER_CHAT_SCR_TYPE.focus();
  document.execCommand("insertHTML", false, msg);
};

ChatListener.prototype.send = function(){
  this.USER_CHAT_BTN_SEND = this.FORM_WEB.find("footer div.copyable-area").find("div button span[data-icon='send']").parent()[0];
  this.USER_CHAT_BTN_SEND.click();
};



// Leitura de dados:

ChatListener.prototype.sendMessage = function(msg){
  this.clearMessage();
  this.addMessage(msg);
  this.send();
};

ChatListener.prototype.countChatMessages = function(){
  return this.USER_CHAT_AREA.children().length;
};
var pb_val;
ChatListener.prototype.decodeMessageId = function(id){
  if( id >= this.countChatMessages ) return -1; // Id inexistente
  var obj_msg = $(this.receiveDivsMessages()[id]).find("div.message-out").find("div.copyable-text");
  pb_val = obj_msg;
  var envio = obj_msg.attr("data-pre-plain-text");
  var mensagem = obj_msg.find("div span[dir='ltr']").html();


  if(envio == undefined) return -1; // Mensagem ilegível

  var envio = envio.split('] ');
  var nome = envio[1].replace(':','');
  var data_0 = envio[0].split('[')[1];
  var hora_data = data_0.split(', ');

  return [nome,mensagem,hora_data[1],hora_data[0]];
};
