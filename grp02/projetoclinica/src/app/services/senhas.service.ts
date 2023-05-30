import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  relatorios: string[] = [];

  constructor() {}

  adicionarRelatorio(relatorio: string) {
    this.relatorios.push(relatorio);
  }
}
