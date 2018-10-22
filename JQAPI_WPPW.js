
class ChatListener{
  constructor(){
    this.FORM_WEB = ".app-wrapper-web";
    this.COUNT_CHILD = $(this.FORM_WEB).childElementCount;
    this.USER_SCREEN = $(this.FORM_WEB).children[this.COUNT_CHILD-1];
    this.USER_FRIENDS_SCR = this.USER_SCREEN.children[2];
    this.USER_CHAT_SCR = this.USER_SCREEN.children[3].children[0];
    this.USER_CHAT_SCR_COUNT = this.USER_CHAT_SCR.childElementCount;

    this.USER_CHAT_SCR_HDR = this.USER_CHAT_SCR.children[1];
    this._CHAT_USER_IMG = this.USER_CHAT_SCR_HDR.children[0];
    this._CHAT_USER_DATA = this.USER_CHAT_SCR_HDR.children[1];
    this._CHAT_USERNAME = this._CHAT_USER_DATA.children[0].children[0].children[0];

    this.USER_CHAT_SCR_TYPE = this.USER_CHAT_SCR.children[this.USER_CHAT_SCR_COUNT-2].children[0].children[1].children[0].children[1];

    this.USER_CHAT_AREA = $(".copyable-area").children[2].children[2];
  }

  get chatName(){
    return this._CHAT_USERNAME.getAttribute('title');
  }

  get receiveDivsMessages(){
    var a = [];
    for(var i=0;i<this.USER_CHAT_AREA.childElementCount;i++)
      a.push(this.USER_CHAT_AREA.children[i]);
    return a;
  }

  clearMessage(){
    this.USER_CHAT_SCR_TYPE.textContent='';
  }

  addMessage(msg){
    this.USER_CHAT_SCR_TYPE.focus();
    document.execCommand("insertHTML", false, msg);
  }

  send(){
    this.USER_CHAT_BTN_SEND = this.USER_CHAT_SCR.children[this.USER_CHAT_SCR_COUNT-2].children[0].children[2].children[0];
    this.USER_CHAT_BTN_SEND.click();
  }

  sendMessage(msg){
    this.clearMessage();
    this.addMessage(msg);
    this.send();
  }

  get countChatMessages(){
    return this.USER_CHAT_AREA.childElementCount;
  }

  decodeMessageId(id){
    if( id >= this.countChatMessages() ) return -1; // Id inexistente
    var obj_msg = this.receiveDivsMessages[id].lastElementChild.firstElementChild.firstElementChild;
    if(obj_msg == null) return -1; // Mensagem ilegível
    var envio = obj_msg.getAttribute("data-pre-plain-text");
    var mensagem = obj_msg.children[0].children[0].textContent;

    var envio = envio.split('] ');
    var nome = envio[1].replace(':','');
    var data_0 = envio[0].split('[')[1];
    var hora_data = data_0.split(', ');

    return [nome,mensagem,hora_data[1],hora_data[0]];
  }
}
