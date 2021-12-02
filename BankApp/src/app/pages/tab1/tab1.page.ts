/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserInfoPage } from '../user-info/user-info.page';
import { User, Cuenta } from '../../interfaces/interfaces';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: User;
  users: User[];
  cuentas: Cuenta[];
  constructor(private modalCtrl: ModalController, private db: DynamoDBService, private router: Router,public alertController: AlertController) {
    this.init();
  }
  cerrarSesion(){
    this.presentAlertConfirm();
  }
  async init(){
    await this.getcurrentUser();
    await this.getpersonalAccounts();

  }
  async getpersonalAccounts(){
    await this.db.getMonetary(this.user.usuario).then(resp =>{
      console.log(resp.data);
      });
  };
  async getcurrentUser(){
    await this.db.getUsers().then(resp =>{
      this.users = resp.data['usuarios'];
      });
    this.user= this.users.filter(user => user.usuario ===  this.db.currentUser)[0];
  }
  async mostrarModalUsuario(user) {
    await this.getcurrentUser();
    const modal = await this.modalCtrl.create({
      component: UserInfoPage,
      componentProps: {
        user
      }
    });
    await modal.present();
    modal.onWillDismiss();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Deseas cerrar sesion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/']);
          }
        }
      ]
    });

    await alert.present();
  }

}
