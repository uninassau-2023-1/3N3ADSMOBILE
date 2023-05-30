import { Component, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  senhas: string[] = [];
  placeholder: string = '';
  ultimaSenhaChamada: string = '';

  constructor(private dadosService: DadosService, private changeDetectorRef: ChangeDetectorRef) {
  }


  ionViewDidEnter() {
    this.carregarSenhas();
    this.carregarUltimaSenhaChamada();
  
  }
  
  carregarSenhas() {
    axios
      .get('http://localhost:3000/senhas')
      .then((response) => {
        this.senhas = response.data;
      })
      .catch((error) => {
        console.error('Erro ao carregar senhas:', error);
      });
  }
  
  carregarUltimaSenhaChamada() {
    axios
      .get('http://localhost:3000/ultimaSenhaChamada')
      .then((response) => {
        this.ultimaSenhaChamada = response.data.senha;
        this.changeDetectorRef.detectChanges();
      })
      .catch((error) => {
        console.error('Erro ao carregar última senha chamada:', error);
      });
  }

  chamarProximaSenha() {
    if (this.senhas.length > 0) {
      const dataAtual = this.obterDataAtual();
      let senha: string | undefined = undefined;

      // Procurar por uma senha prioritária (SP)
      const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
      if (senhaSP) {
        senha = senhaSP;
      } else {
        // Procurar por uma senha de exame (SE)
        const senhaSE = this.senhas.find((s) => s.startsWith(dataAtual + '-SE'));
        if (senhaSE) {
          senha = senhaSE;
        } else {
          // Procurar por uma senha geral (SG)
          const senhaSG = this.senhas.find((s) => s.startsWith(dataAtual + '-SG'));
          if (senhaSG) {
            senha = senhaSG;
          }
        }
      }

      if (senha) {
        this.placeholder = senha;
        this.senhas = this.senhas.filter((s) => s !== senha);
        axios
          .delete(`http://localhost:3000/senhas/${senha}`)
          .then(() => {
            console.log(`Senha ${senha} chamada com sucesso!`);
          })
          .catch((error) => {
            console.error('Erro ao chamar senha:', error);
          });
  
        this.atualizarUltimaSenhaChamada(senha); // Atualiza a última senha chamada na API
        this.atualizarUltimasSenhasChamadas(senha);
  
        this.dadosService.senhasChamadas.push(senha);
        this.dadosService.atualizarSenhas();
      }
    }
    this.carregarUltimaSenhaChamada();
  }

  atualizarUltimaSenhaChamada(senha: string) {
    axios
      .post('http://localhost:3000/ultimaSenhaChamada', { senha })
      .then(() => {
        this.ultimaSenhaChamada = senha; // Atualiza a última senha chamada no componente
        console.log('Última senha chamada atualizada na API com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar última senha chamada na API:', error);
      });
  }
  atualizarUltimasSenhasChamadas(senha: string) {
    axios
      .post('http://localhost:3000/ultimasSenhasChamadas', { senha })
      .then(() => {
        console.log('Últimas senhas chamadas atualizadas na API com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar últimas senhas chamadas na API:', error);
      });
  }
  

  obterDataAtual(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear().toString().slice(-2);
    const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataAtual.getDate()).slice(-2);
    return ano + mes + dia;
  }
}
