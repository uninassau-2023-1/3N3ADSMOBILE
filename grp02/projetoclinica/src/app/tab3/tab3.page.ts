import { AfterContentInit, Component, Input } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  totalSenhasEmitidas: number = 0;
  totalSenhasGeraisEmitidas: number = 0;
  totalSenhasPreferenciaisEmitidas: number = 0;
  totalExamesEmitidos: number = 0;
  relatorios: string[] = [];

  async ionViewWillEnter() {
    this.incrementarTotalSenhasGerais()
    this.incrementarTotalSenhasPreferenciais()
    this.incrementarTotalExames()
    this.calcularTotais()
  }

  constructor(private senhasService: SenhasService, private storage: TabsPage) {}

  async calcularTotais() {
    const test1 = parseInt(await this.storage.get("senhaGeral") ?? 0)
    const test2 = parseInt(await this.storage.get("senhaPreferencial") ?? 0)
    const test3 = parseInt(await this.storage.get("senhaExame") ?? 0)
    this.totalSenhasEmitidas = test1 + test2 + test3
  }

  async incrementarTotalSenhasGerais() {
    this.totalSenhasGeraisEmitidas = parseInt(await this.storage.get("senhaGeral") ?? 0)
  }

  async incrementarTotalSenhasPreferenciais() {
    this.totalSenhasPreferenciaisEmitidas = parseInt(await this.storage.get("senhaPreferencial") ?? 0) 
  }

  async incrementarTotalExames() {
    this.totalExamesEmitidos = parseInt(await this.storage.get("senhaExame") ?? 0)
  }
}
