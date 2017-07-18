

var CLASSE_PAINEL_CONVERSA=".pane.pane-chat.pane-two";
var CLASSE_CABECALHO_CONVERSA=".pane-header.pane-chat-header";
var CLASSE_SPAN_NOME_PESSOA=".chat-body .chat-main .chat-title .emojitext.ellipsify";
var CLASSE_SPAN_VISUALIZACAO_PESSOA=".chat-body .chat-secondary.pane-chat-header-subtitle .emojitext.ellipsify";
var CLASSE_IMG_FOTO_PESSOA=".chat-avatar .avatar.icon-user-default .avatar-image.is-loaded";


//Dos SPANs, ler o atributo "title".
var ADDR_CLASSE_NOME_PESSOA= CLASSE_PAINEL_CONVERSA+" "+CLASSE_CABECALHO_CONVERSA+" "+CLASSE_SPAN_NOME_PESSOA;
var ADDR_CLASSE_VISUALIZACAO_PESSOA= CLASSE_PAINEL_CONVERSA+" "+CLASSE_CABECALHO_CONVERSA+" "+CLASSE_SPAN_VISUALIZACAO_PESSOA;

//Da IMG, ler o atributo "src".
var ADDR_CLASSE_FOTO_PESSOA= CLASSE_PAINEL_CONVERSA+" "+CLASSE_CABECALHO_CONVERSA+" "+CLASSE_IMG_FOTO_PESSOA;
