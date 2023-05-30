import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  totalSenhasEmitidas: number = 0;
  totalSenhasGerais: number = 0;
  totalSenhasPreferenciais: number = 0;
  totalSenhasExames: number = 0;
  numeroCliente: number = 0;

  constructor(
    private alertController: AlertController, private storage: TabsPage) {}

  async chamarSenhaGeral() {
    const value = this.totalSenhasEmitidas + 1
    this.storage.set("senhaGeral", value.toString())
    this.totalSenhasEmitidas++;
    this.totalSenhasGerais++;
    this.numeroCliente++;

    const alert = await this.alertController.create({
      header: 'Senha Geral',
      message: 'Número do cliente: ' + this.formatarNumeroCliente(),
      buttons: ['OK'],
    });

    await alert.present();
  }

  async gerarSenhaPreferencial() {
    const value = this.totalSenhasPreferenciais + 1
    this.storage.set("senhaPreferencial", value.toString())
    this.totalSenhasEmitidas++;
    this.totalSenhasPreferenciais++;
    this.numeroCliente++;

    const alert = await this.alertController.create({
      header: 'Senha Preferencial',
      message: 'Número do cliente: ' + this.formatarNumeroCliente(),
      buttons: ['OK'],
    });

    await alert.present();
  }

  async chamarSenhaExames() {
    const value = this.totalSenhasExames + 1
    this.storage.set("senhaExame", value.toString())
    this.totalSenhasEmitidas++;
    this.totalSenhasExames++;
    this.numeroCliente++;

    const alert = await this.alertController.create({
      header: 'Entrega de Exames',
      message: 'Número do cliente: ' + this.formatarNumeroCliente(),
      buttons: ['OK'],
    });

    await alert.present();
  }

  formatarNumeroCliente() {
    return ('0000' + this.numeroCliente).slice(-4);
  }
}
