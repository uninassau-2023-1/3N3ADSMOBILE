import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  totalSenhasGeradas: number = 0;
  senhasGeradasPorTipo: Record<string, number> = {};
  senhasAtendidas: number = 0;
  senhasNaoAtendidas: number = 0;

  constructor() {}

  ionViewDidEnter() {
    this.carregarRelatorios();
  }

  carregarRelatorios() {
    axios
      .get('http://localhost:3000/senhas/count')
      .then((response) => {
        const { total, tipos, naoAtendidas } = response.data;
        this.totalSenhasGeradas = total;
        this.senhasGeradasPorTipo = tipos;
        this.senhasNaoAtendidas = naoAtendidas;
        this.senhasAtendidas = this.totalSenhasGeradas - this.senhasNaoAtendidas;
      })
      .catch((error) => {
        console.error('Erro ao carregar relatórios:', error);
      });
  }
  apagarDados() {
    axios
      .delete('http://localhost:3000/senhas')
      .then(() => {
        console.log('Dados apagados com sucesso!');
        location.reload(); // Atualizar a página
      })
      .catch((error) => {
        console.error('Erro ao apagar os dados:', error);
      });
  }
}
