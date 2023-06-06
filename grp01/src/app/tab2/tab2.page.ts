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
      let senhaAnterior: string | undefined = this.dadosService.senhasChamadas.slice(-1)[0];
      let tipoSenhaAnterior: string | undefined = senhaAnterior ? senhaAnterior.split('-')[1] : undefined;
      let tipoSenhaAnteriorPrimeiraExecucao: string | undefined = this.dadosService.senhasChamadas[0] ? this.dadosService.senhasChamadas[0].split('-')[1] : undefined;

      // Variáveis de contagem
      let contadorSP: number = 0;
      let contadorSG: number = 0;
      let contadorSE: number = 0;

      // Atualizar contadores
      this.senhas.forEach((s) => {
        if (s.endsWith('-SP')) {
          contadorSP++;
        } else if (s.endsWith('-SG')) {
          contadorSG++;
        } else if (s.endsWith('-SE')) {
          contadorSE++;
        }
      });

      if (!senhaAnterior) {
        // Primeira execução
        const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
        if (senhaSP) {
          senha = senhaSP;
        } else {
          const senhaSG = this.senhas.find((s) => s.startsWith(dataAtual + '-SG'));
          if (senhaSG) {
            senha = senhaSG;
          } else {
            const senhaSE = this.senhas.find((s) => s.startsWith(dataAtual + '-SE'));
            if (senhaSE) {
              senha = senhaSE;
            }
          }
        }
      } else {
        // Segunda execução
        if (tipoSenhaAnteriorPrimeiraExecucao === 'SP' || tipoSenhaAnteriorPrimeiraExecucao === 'SG') {
          if (tipoSenhaAnterior === 'SE') {
            const senhaSG = this.senhas.find((s) => s.startsWith(dataAtual + '-SG'));
            if (senhaSG) {
              senha = senhaSG;
            } else {
              const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
              if (senhaSP) {
                senha = senhaSP;
              }
            }
          } else if (tipoSenhaAnterior === 'SG') {
            const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
            if (senhaSP) {
              senha = senhaSP;
            }
          } else {
            const senhaSE = this.senhas.find((s) => s.startsWith(dataAtual + '-SE'));
            if (senhaSE) {
              senha = senhaSE;
            } else {
              if (tipoSenhaAnteriorPrimeiraExecucao === 'SP') {
                const senhaSG = this.senhas.find((s) => s.startsWith(dataAtual + '-SG'));
                if (senhaSG) {
                  senha = senhaSG;
                }
              } else {
                const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
                if (senhaSP) {
                  senha = senhaSP;
                }
              }
            }
          }
        } else {
          const senhaSP = this.senhas.find((s) => s.startsWith(dataAtual + '-SP'));
          if (senhaSP) {
            senha = senhaSP;
          } else {
            const senhaSG = this.senhas.find((s) => s.startsWith(dataAtual + '-SG'));
            if (senhaSG) {
              senha = senhaSG;
            } else {
              const senhaSE = this.senhas.find((s) => s.startsWith(dataAtual + '-SE'));
              if (senhaSE) {
                senha = senhaSE;
              }
            }
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

        this.atualizarUltimaSenhaChamada(senha);
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
