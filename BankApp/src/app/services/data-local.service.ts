import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private storage: Storage) {
        this.init();
  }
  async init() {
    await this.storage.create();
  }
}
