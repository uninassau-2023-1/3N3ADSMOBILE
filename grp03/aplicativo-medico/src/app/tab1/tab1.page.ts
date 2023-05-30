import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  senhas: string[] = [];
  senhasChamadas: string[] = [];
  ultimasSenhasChamadas: string[] = [];

  constructor(private dadosService: DadosService) {}

  
  ngOnInit() {
    this.carregarUltimasSenhasChamadas();
    this.dadosService.atualizarSenhas$.subscribe(() => {
      this.carregarUltimasSenhasChamadas();
    });
  }

  carregarUltimasSenhasChamadas() {
    axios
      .get('http://localhost:3000/ultimasSenhasChamadas')
      .then((response) => {
        this.ultimasSenhasChamadas = response.data;
      })
      .catch((error) => {
        console.error('Erro ao carregar últimas senhas chamadas:', error);
      });
  }

  gerarSenha(tipo?: string) {
    const timestamp = this.obterTimestampAtual();

    axios
      .post('http://localhost:3000/senhas', { tipo: tipo || '' })
      .then(() => {
        this.dadosService.atualizarSenhas(); // Emite o evento para atualizar as senhas na Tab2
      })
      .catch((error) => {
        console.error('Erro ao gerar senha:', error);
      });
  }

  obterTimestampAtual(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear().toString().slice(-2);
    const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataAtual.getDate()).slice(-2);
    return ano + mes + dia;
  }
}
