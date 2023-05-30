import { Component } from '@angular/core';
import { SenhaService } from '../senha.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private senhaService: SenhaService, private alertController: AlertController) { }
  // Injeta o serviço de senhas (SenhaService) e o controlador de alerta (AlertController) no construtor

  async criarSenha(tipoSenha: string) {
    const senha = this.senhaService.criarSenha(tipoSenha);
    // Chama o método criarSenha do serviço de senhas para gerar uma nova senha

    const alert = await this.alertController.create({
      header: 'Senha Gerada',
      message: `Senha ${senha} foi gerada com sucesso!`,
      buttons: ['OK']
    });
    // Cria um alerta para exibir a senha gerada com sucesso

    await alert.present();
    // Exibe o alerta na tela
  }
}
