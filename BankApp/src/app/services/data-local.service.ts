import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getCurrentUser() {
    const user = await this.storage.get('currentUser');

    if (user != null) {
      return user;
    } else {
      return null;
    }
  }
  guardarCurrentUser(user: any) {
    this.storage.set('currentUser', user);
  }
}
