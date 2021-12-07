/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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
  cuentas: Cuenta[] = [];
  bubbles: boolean;
  cuentaMonetaria: Cuenta;
  constructor(private modalCtrl: ModalController,
              private db: DynamoDBService,
              private router: Router,
              private toastController: ToastController,
              public alertController: AlertController) {
          this.init();
  }

  async ionViewWillEnter(){

    const user = await this.db.currentUser;
    if( user === '' || user === undefined){
        await this.presentToast('Sesion expirada','danger');
        this.router.navigate(['/']);
    }

  }
  cerrarSesion(){
    this.db.currentUser = '';
    this.db.isAdmin = false;
    this.presentAlertConfirm();
  }
  transferir(){
    this.db.getUserTrans(this.user.usuario);
  }
  historial(){}

  async init(){
    this.bubbles = true;
    await this.getcurrentUser();
    if (this.user !== undefined) {
      await this.getpersonalAccounts();
    }
    this.bubbles = false;
  }

  async getpersonalAccounts(){
    await this.db.getMonetary(this.user.usuario).then(resp =>{
      this.cuentaMonetaria=(resp.data);
      });

      await this.db.getUserAccounts(this.user.usuario).then(resp =>{
        this.cuentas=(resp.data['cuentas']);
        });
  };
  async getcurrentUser(){
    await this.db.getUsers().then(resp =>{
      this.users = resp.data['usuarios'];
      });
    this.user= this.users.filter(user => user.usuario ===  this.db.currentUser)[0];
  }
  async mostrarModalUsuario(user) {
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

  async presentToast(_message: string, _color: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: _message,
      duration: 1000,
      color: _color,
    });
    toast.present();
  }
}
