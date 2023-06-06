import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DadosService } from './dados.service';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importe o módulo IonicStorageModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot() // Adicione o IonicStorageModule aos imports
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, [DadosService]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
