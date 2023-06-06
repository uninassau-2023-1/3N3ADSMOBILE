import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  senhasChamadas: string[] = []; // Array para armazenar as senhas chamadas

  atualizarSenhas$ = new Subject<void>();

  constructor() { }

  atualizarSenhas() {
    this.atualizarSenhas$.next();
  }
}
