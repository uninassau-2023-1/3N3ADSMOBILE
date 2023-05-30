import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SenhaPage } from './senha/senha.page';

const routes: Routes = [
  { path: '', redirectTo: 'senha', pathMatch: 'full' },
  { path: 'senha', component: SenhaPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
