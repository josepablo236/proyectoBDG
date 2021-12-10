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
    let user = await this.storage.get('currentUser');

    if (user === null || user === undefined) {
      user = {
        usuario: undefined,
        isAdmin: false,
      };
    }
    return user;
  }
  guardarCurrentUser(user: any) {
    this.storage.set('currentUser', user);
  }
}
