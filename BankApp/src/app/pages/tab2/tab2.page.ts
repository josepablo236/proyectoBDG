/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta, User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { TransferenciaComponent } from '../../components/transferencia/transferencia.component';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  bubbles = false; //variable para mostrar el spinnig bubbles
  textoBuscar = '';
  currentUser = {
    usuario: undefined,
    isAdmin: false,
  };
  cuentas: Cuenta[] = [];
  cuentasAhorro: Cuenta[] = [];
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.bubbles = true;
    this.init();
  }

  doRefresh(event) {
    setTimeout(async () => {
      await this.db.getMonetaryAcounts().then((resp) => {
        this.cuentas = resp.data['monetarias'];
      });
      await this.db.getAcounts().then((resp) => {
        this.cuentasAhorro = resp.data['cuentas'];
      });
      event.target.complete();
    }, 1500);
  }
  getFavorites() {}

  onSearchChange(event) {
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if (true) {
      setTimeout(() => {}, 1000);
    } else {
      setTimeout(() => {
        this.bubbles = false;
      }, 500);
    }
    if (this.textoBuscar === '') {
      this.bubbles = false;
    }
  }
  createTransfer() {
    this.createTransfer();
  }

  async ionViewWillEnter() {
    this.currentUser = await this.storage.getCurrentUser();
    if (this.currentUser.usuario === undefined) {
      await this.presentToast('Sesion expirada', 'danger');
      this.router.navigate(['/']);
    } else {
      this.init();
    }
  }
  async init() {
    this.currentUser = await this.storage.getCurrentUser();
    console.log(this.currentUser);
    if (this.currentUser.isAdmin) {
      this.db.getMonetaryAcounts().then((resp) => {
        this.cuentas = resp.data['monetarias'];
      });
      this.db.getAcounts().then((resp) => {
        this.cuentasAhorro = resp.data['cuentas'];
      });
    } else if (this.currentUser.usuario !== undefined) {
      //metodo para llamar las favoritas de los usuarios
    }
    this.bubbles = false;
  }
  //Modal de crear transferencia
  async mostrarModalCreate() {
    const modal = await this.modalController.create({
      component: TransferenciaComponent,
      componentProps: {},
    });
    await modal.present();
    modal.onWillDismiss();
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
