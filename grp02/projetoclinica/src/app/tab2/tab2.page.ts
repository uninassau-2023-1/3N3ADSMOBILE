import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SenhasService } from '../services/senhas.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  senhaGeral: number = 0;
  senhaPreferencial: number = 0;
  senhaExames: number = 0;
  ultimasSenhas: string[] = [];

  @Output() relatorioEmitido: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private alertController: AlertController,
    private senhasService: SenhasService
  ) {}

  async chamarSenhaGeral() {
    this.senhaGeral++;
    const senha = this.formatarNumero(this.senhaGeral, 'GERAL');

    const alert = await this.alertController.create({
      header: 'Senha Geral',
      message: `Senha geral: ${senha}`,
      buttons: ['OK']
    });
    this.relatorioEmitido.emit(senha); // Emite o relatório para o Tab 3


    await alert.present();
    this.adicionarUltimaSenha(senha);
  }

  async gerarSenhaPreferencial() {
    this.senhaPreferencial++;
    const senha = this.formatarNumero(this.senhaPreferencial, 'PREFERENCIAL');

    const alert = await this.alertController.create({
      header: 'Senha Preferencial',
      message: `Senha preferencial: ${senha}`,
      buttons: ['OK']
    });
    this.relatorioEmitido.emit(senha); // Emite o relatório para o Tab 3


    await alert.present();
    this.adicionarUltimaSenha(senha);
  }

  async chamarSenhaExames() {
    this.senhaExames++;
    const senha = this.formatarNumero(this.senhaExames, 'EXAMES');

    const alert = await this.alertController.create({
      header: 'Entrega de Exames',
      message: `Senha para entrega de exames: ${senha}`,
      buttons: ['OK']
    });
    

    await alert.present();
    this.adicionarUltimaSenha(senha);
  }

  formatarNumero(numero: number, tipo?: string): string {
    let senhaFormatada = numero.toString().padStart(4, '0');
    if (tipo) {
      senhaFormatada = `${tipo}-${senhaFormatada}`;
    }
    return senhaFormatada;
  }

  adicionarUltimaSenha(senha: string) {
    this.ultimasSenhas.unshift(senha);
    if (this.ultimasSenhas.length > 5) {
      this.ultimasSenhas.pop();
    }
  }
}
