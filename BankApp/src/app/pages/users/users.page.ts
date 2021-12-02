/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';
import { User } from '../../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';
import { CreateUsersPage } from '../create-users/create-users.page';
import { UserInfoPage } from '../user-info/user-info.page';

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
    nacimiento: new Date(),
    telefono: ''
  };
  users: User[] = [];
  constructor(private toastController: ToastController, private db: DynamoDBService, private modalCtrl: ModalController){
  }

  ngOnInit() {
    //Mostrar todos los usuarios creados (admin)
    this.db.getUsers().then(resp =>{
    this.users=resp.data['usuarios'];
    });
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
