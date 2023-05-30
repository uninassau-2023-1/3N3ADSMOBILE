import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  senhaPrioritaria: number = 0;
  senhaGeral: number = 0;
  senhaExame: number = 0;
  ultimasSenhasChamadas: string[] = [];

  criarSenha(tipoSenha: string): string | undefined {
    let senha: string | undefined;
    if (tipoSenha === 'SP') {
      this.senhaPrioritaria++;
      senha = this.criarSenhaFormatada('SP', this.senhaPrioritaria);
    } else if (tipoSenha === 'SG') {
      this.senhaGeral++;
      senha = this.criarSenhaFormatada('SG', this.senhaGeral);
    } else if (tipoSenha === 'SE') {
      this.senhaExame++;
      senha = this.criarSenhaFormatada('SE', this.senhaExame);
    }
    return senha;
  }
  // Método responsável por criar uma nova senha com base no tipo de senha fornecido.
  // Incrementa o contador apropriado para o tipo de senha e chama o método privado
  // criarSenhaFormatada para formatar a senha no padrão desejado.

  private criarSenhaFormatada(tipoSenha: string, sequencia: number): string {
    const data = new Date();
    const ano = data.getFullYear().toString().slice(-2);
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const senha = `${ano}${mes}${dia}${"-"}${tipoSenha}${sequencia.toString().padStart(2, '0')}`;
    return senha;
  }
  // Método privado responsável por formatar a senha no padrão desejado.
  // Obtém a data atual e extrai o ano, mês e dia como parte da senha formatada.
  // Concatena o tipo de senha e a sequência fornecida, garantindo que estejam no formato desejado.

  getSenhas(): string[] {
    const senhas = [
      `Senha Prioritária: ${this.criarSenhaFormatada('SP', this.senhaPrioritaria)}`,
      `Senha Geral: ${this.criarSenhaFormatada('SG', this.senhaGeral)}`,
      `Senha de Exame: ${this.criarSenhaFormatada('SE', this.senhaExame)}`
    ];
    return senhas;
  }
  // Retorna um array contendo as três últimas senhas geradas para cada tipo de senha.
  // Utiliza o método criarSenhaFormatada para formatar cada senha no padrão desejado.

  chamarSenha(): string | undefined {
    let senha: string | undefined;
    if (this.senhaPrioritaria > 0) {
      senha = this.criarSenhaFormatada('SP', this.senhaPrioritaria);
      this.senhaPrioritaria--;
    } else if (this.senhaGeral > 0) {
      senha = this.criarSenhaFormatada('SG', this.senhaGeral);
      this.senhaGeral--;
    } else if (this.senhaExame > 0) {
      senha = this.criarSenhaFormatada('SE', this.senhaExame);
      this.senhaExame--;
    }
    if (senha) {
      this.ultimasSenhasChamadas.unshift(senha);
      if (this.ultimasSenhasChamadas.length > 5) {
        this.ultimasSenhasChamadas.pop();
      }
    }
    return senha;
  }
  // Retorna a próxima senha a ser chamada com base na prioridade (senha prioritária,
  // senha geral e senha de exame, nesta ordem). Decrementa o contador apropriado para
  // o tipo de senha chamada. Adiciona a senha chamada à lista de últimas senhas chamadas,
  // colocando-a no início da lista. Se houver mais de 5 senhas na lista, remove a mais antiga.
  // Retorna a senha chamada.

  getUltimasSenhasChamadas(quantidade: number): string[] {
    return this.ultimasSenhasChamadas.slice(0, quantidade);
  }
  // Retorna a quantidade especificada de últimas senhas chamadas. Utiliza o método
  // slice para obter apenas os elementos desejados da lista de últimas senhas chamadas.
}
