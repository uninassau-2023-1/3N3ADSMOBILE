import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  geralCounter: number = 0;
  preferencialCounter: number = 0;
  examesCounter: number = 0;
  senhaGeralChamada: string = '';
  senhaPreferencialChamada: string = '';
  senhaExamesChamada: string = '';
  senhasChamadas: string[] = [];

  geral() {
    this.geralCounter++;
    const senha = this.formatarSenha(this.geralCounter);
    this.senhaGeralChamada = senha;
    this.senhasChamadas.push(senha);
    this.mostrarPopup('Senha Geral', senha);
  }

  preferencial() {
    this.preferencialCounter++;
    const senha = this.formatarSenha(this.preferencialCounter);
    this.senhaPreferencialChamada = senha;
    this.senhasChamadas.push(senha);
    this.mostrarPopup('Senha Preferencial', senha);
  }

  exames() {
    this.examesCounter++;
    const senha = this.formatarSenha(this.examesCounter);
    this.senhaExamesChamada = senha;
    this.senhasChamadas.push(senha);
    this.mostrarPopup('Entrega de Exames', senha);
  }

  private formatarSenha(contador: number): string {
    return contador.toString().padStart(4, '0');
  }

  private mostrarPopup(tipoSenha: string, senha: string) {
    // Implemente a lógica para exibir uma pop-up com a informação da senha.
    // Pode ser uma caixa de diálogo, um elemento HTML oculto que se torna visível, ou outra abordagem.
  }

  // Resto do código...
}
