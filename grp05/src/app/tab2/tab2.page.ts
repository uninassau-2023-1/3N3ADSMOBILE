import { Component } from '@angular/core';
import { SenhaService } from '../senha.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  senhas: string[] = []; // Array para armazenar as últimas senhas chamadas
  senha: string | undefined; // Variável para armazenar a senha atual

  constructor(private senhaService: SenhaService) { }
  // Injeta o serviço de senhas (SenhaService) no construtor

  ionViewWillEnter() {
    this.updateSenhas();
  }
  // Método que é executado quando a página é exibida

  updateSenhas() {
    const ultimasSenhas = this.senhaService.getUltimasSenhasChamadas(5);
    // Obtém as últimas 5 senhas chamadas do serviço de senhas
    this.senhas = ultimasSenhas.map(senha => this.formatarSenha(senha));
    // Formata as senhas obtidas e as armazena no array senhas
  }

  formatarSenha(senha: string): string {
    const data = senha.substr(0, 6);
    const tipoSenha = senha.substr(6, 2);
    const sequencia = senha.substr(8);
    // Divide a senha em partes: data, tipo de senha e sequência

    return `${data.substr(0, 2)}${data.substr(2, 2)}${data.substr(4, 2)}${tipoSenha}${sequencia}`;
    // Formata a senha no formato desejado: DDMMYY-sequenciaTipoSenha
  }

  chamarSenha() {
    this.senha = this.senhaService.chamarSenha();
    // Chama a próxima senha do serviço de senhas e armazena em senha
    if (this.senha) {
      this.updateSenhas();
    }
    // Se a senha foi chamada com sucesso, atualiza a lista de senhas exibida
  }
}
