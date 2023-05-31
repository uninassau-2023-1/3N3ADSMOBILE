import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public totalSenhas: number = 0;

  constructor() { }

  somaSenha() {
    this.totalSenhas = this.totalSenhas + 1;
    console.log(this.totalSenhas);
  }
}
