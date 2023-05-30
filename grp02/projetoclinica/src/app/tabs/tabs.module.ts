import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { Drivers } from '@ionic/storage';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    IonicStorageModule.forRoot({
      name: "mydb",
      driverOrder: [Drivers.IndexedDB]
    })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
