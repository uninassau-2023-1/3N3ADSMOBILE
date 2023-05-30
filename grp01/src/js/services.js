angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

var filaSenhas = [];
var contadorSP = 0;
var contadorSE = 0;
var contadorSG = 0;
var lastCalled = "";
var currentTicket = "";
var servingTicket = "";

function gerarSenha(tipo) {
  var data = new Date();
  var ano = data.getFullYear().toString().substr(-2);
  var mes = ("0" + (data.getMonth() + 1)).slice(-2);
  var dia = ("0" + data.getDate()).slice(-2);

  if (tipo === "SP") {
    contadorSP++;
  } else if (tipo === "SE") {
    contadorSE++;
  } else if (tipo === "SG") {
    contadorSG++;
  }

  var contadorFormatado = ("0" + getContadorFormatado(tipo)).slice(-2);

  var senha = ano + mes + dia + tipo + contadorFormatado;
  return senha;
}

function getContadorFormatado(tipo) {
  if (tipo === "SP") {
    return contadorSP;
  } else if (tipo === "SE") {
    return contadorSE;
  } else if (tipo === "SG") {
    return contadorSG;
  }
}

function adicionarSenhaFila(tipo) {
  filaSenhas.push(tipo);
  console.log("Senha adicionada à fila: " + tipo);
}

function chamarProximaSenha() {
  if (filaSenhas.length === 0) {
    console.log("Não há senhas na fila.");
    return;
  }

  if (contadorSP >= 2) {
    // Chama uma senha SP
    contadorSP--;
    currentTicket = "SP" + contadorSP.toString().padStart(2, "0");
  } else if (contadorSE > 0) {
    // Chama uma senha SE
    contadorSE--;
    currentTicket = "SE" + contadorSE.toString().padStart(2, "0");
  } else if (contadorSG > 0) {
    // Chama uma senha SG
    contadorSG--;
    currentTicket = "SG" + contadorSG.toString().padStart(2, "0");
  } else {
    // Não há senhas na fila
    currentTicket = "";
  }

  servingTicket = currentTicket;
  console.log("Senha em atendimento: " + servingTicket);
}

function selecionarSenha(tipo) {
  currentTicket = gerarSenha(tipo);
  console.log("Senha escolhida: " + currentTicket);
  adicionarSenhaFila(tipo);
  chamarProximaSenha();
  lastCalled = currentTicket;
}

// Exemplo de uso dos botões no HTML:
// <button class="button" ng-click="selecionarSenha('SP')">Selecionar Senha SP</button>
// <button class="button" ng-click="selecionarSenha('SG')">Selecionar Senha SG</button>
// <button class="button" ng-click="selecionarSenha('SE')">Selecionar Senha SE</button>
// <button class="button" ng-click="chamarProximaSenha()">Chamar Próxima Senha</button>
