import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { DataLocalService } from '../../services/data-local.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isAdmin: boolean;
  currentUser: any;
  constructor(
    private storage: DataLocalService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.isAdmin = false;
    this.init();
  }
  //metodo para mostrar las diferentes tabs, segun el tipo de usuario
  async init() {
    this.currentUser = await this.storage.getCurrentUser();
    console.log(this.currentUser);
    this.isAdmin = this.currentUser.isAdmin;
  }
  async ionViewWillEnter() {
    await this.init();
    if (this.currentUser === undefined || this.currentUser === null) {
      await this.presentToast('Sesion expirada', 'danger');
      this.router.navigate(['/']);
    }
  }
  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: toastColor,
    });
    toast.present();
  }
}
