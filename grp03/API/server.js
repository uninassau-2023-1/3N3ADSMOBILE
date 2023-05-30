const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    // Verifica se é uma solicitação OPTIONS e retorna uma resposta bem-sucedida com os cabeçalhos CORS permitidos
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });


let senhas = [];
let contadorSenhas = 0;
let tiposSenhas = {};
let senhasNaoAtendidas = 0;
let ultimaSenhaChamada = '⠀';
let ultimasSenhasChamadas = [];

app.get('/senhas', (req, res) => {
  res.json(senhas);
});

app.get('/senhas/count', (req, res) => {
  res.json({ 
    total: contadorSenhas,
    tipos: tiposSenhas,
    naoAtendidas: senhasNaoAtendidas
  });
});

app.get('/ultimaSenhaChamada', (req, res) => {
  res.json({ senha: ultimaSenhaChamada });
});
app.get('/ultimasSenhasChamadas', (req, res) => {
  res.json(ultimasSenhasChamadas);
});

app.post('/ultimasSenhasChamadas', (req, res) => {
  const senha = req.body.senha || '';
  
  // Adicionar a senha na lista de últimas senhas chamadas
  ultimasSenhasChamadas.unshift(senha);
  
  // Manter apenas as 5 últimas senhas chamadas
  if (ultimasSenhasChamadas.length > 5) {
    ultimasSenhasChamadas = ultimasSenhasChamadas.slice(0, 5);
  }
  
  res.status(200).json({ message: 'Últimas senhas chamadas atualizadas com sucesso!' });
});

app.put('/ultimaSenhaChamada', (req, res) => {
  const senha = req.body.senha || '';
  ultimaSenhaChamada = senha;
  res.json({ message: 'Última senha chamada atualizada com sucesso!' });
});

app.post('/ultimaSenhaChamada', (req, res) => {
  const senha = req.body.senha || '';
  ultimaSenhaChamada = senha;
  res.status(200).json({ message: 'Última senha chamada atualizada com sucesso!' });
});

app.post('/senhas', (req, res) => {
  const tipo = req.body.tipo || '';
  const novaSenha = `${obterDataAtual()}-${tipo}-${contadorSenhas + 1}`;
  senhas.push(novaSenha);
  contadorSenhas++;

  if (tiposSenhas[tipo]) {
    tiposSenhas[tipo]++;
  } else {
    tiposSenhas[tipo] = 1;
  }
  senhasNaoAtendidas++;

  res.status(201).json({ senha: contadorSenhas });
});

app.delete('/senhas/:senha', (req, res) => {
    const senha = req.params.senha;
    
    const index = senhas.indexOf(senha);
    if (index !== -1) {
      senhas.splice(index, 1);
      senhasNaoAtendidas--;
      res.json({ message: `Senha ${senha} removida com sucesso!` });
    } else {
      res.status(404).json({ error: 'Senha não encontrada.' });
    }
  });
  

  app.delete('/senhas', (req, res) => {
    senhas = [];
    ultimaSenhaChamada = '⠀';
    ultimasSenhasChamadas = [];
    contadorSenhas = 0;
    tiposSenhas = {}; // Zera a contagem de senhas por tipo
    senhasNaoAtendidas = 0; // Zera a contagem de senhas não atendidas
    
    res.json({ message: 'Senhas zeradas com sucesso!' });
  });


function obterDataAtual() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear().toString().slice(-2);
    const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataAtual.getDate()).slice(-2);
    return `${ano}${mes}${dia}`;
  }
  
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
