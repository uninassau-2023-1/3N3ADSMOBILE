import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SenhaPage } from './senha.page';

const routes: Routes = [
  // outras rotas...
  {
    path: 'senha',
    component: SenhaPage
  },
  // outras rotas...
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

