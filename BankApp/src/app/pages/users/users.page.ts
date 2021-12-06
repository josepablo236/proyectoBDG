
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';
import { User } from '../../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';
import { CreateUsersPage } from '../create-users/create-users.page';
import { UserInfoPage } from '../user-info/user-info.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  toastText: string;
  toastColor: string;
  checked: boolean;
  minDate = (new Date()).getFullYear()-18;
  user: User = {
    usuario: '',
    password: '',
    rol: '',
    nombre: '',
    direccion: '',
    nacimiento: '',
    telefono: ''
  };
  users: User[] = [];
  constructor(private db: DynamoDBService,
              private router: Router,
              private toastController: ToastController,
              private modalCtrl: ModalController,
              private alertController: AlertController){
  }

  ngOnInit() {
    //Mostrar todos los usuarios creados (admin)
    this.getUsers();
  }
  async getUsers(){
    await this.db.getUsers().then(resp =>{
      this.users=  resp.data['usuarios'];
      });
  }
  eliminarUsuario(user: User){
    this.db.deleteUser(user.usuario);
  }
  cerrarSesion(){
    this.db.currentUser = '';
    this.db.isAdmin = false;
    this.presentAlertConfirm();
  }
  async ionViewWillEnter(){
    const user = await this.db.currentUser;
    if( user === '' || user === undefined){
        await this.presentToast('Sesion expirada','danger');
        this.router.navigate(['/']);
    }else{
      this.getUsers();
    }
  }
  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: toastColor
    });
    toast.present();
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
  async mostrarModalCreate() {
    const modal = await this.modalCtrl.create({
      component: CreateUsersPage,
      componentProps: {
      }
    });
    await modal.present();
    modal.onWillDismiss();
  }
  async mostrarModalUsuario(user: User) {
    const modal = await this.modalCtrl.create({
      component: UserInfoPage,
      componentProps: {
        user
      }
    });
    await modal.present();
    modal.onWillDismiss();
  }
}
