import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private tstorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create()
    this.tstorage = storage
  }

  public async set(key: string, value: string) {
    this.storage?.set(key, value)
  }

  public async get(key: string) {
    let value = await this.tstorage?.get(key)
    return value
  }
}
