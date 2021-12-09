/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { Transferencia, User, Cuenta } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  transferencias: Transferencia[] = [];
  currentUser = {
    usuario: undefined,
    isAdmin: false,
  };
  numeroCuenta = '';
  campos = [
    'destinatario',
    'cta. destinatario',
    'remitente',
    'cta. remitente',
    'fecha',
    'numero transferencia',
    'cantidad',
  ];
  bubbles = true;
  textoBuscar = '';
  columnaBuscar = '';
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.bubbles = true;
    this.init();
  }
  async init() {
    this.currentUser = await this.storage.getCurrentUser();
    if (this.currentUser.isAdmin) {
      this.db.getTransfers().then((resp) => {
        this.transferencias = resp.data['transferencias'];
      });
    } else {
      this.db.getUserTrans(this.currentUser.usuario).then((resp) => {
        this.transferencias = resp.data['trans'];
      });
    }
    this.bubbles = false;
  }
  getColumnText(event) {
    switch (event.detail.value) {
      case 'cta. destinatario':
        this.columnaBuscar = 'cuentaDest';
        break;
      case 'cta. remitente':
        this.columnaBuscar = 'cuentaRemi';
        break;
      case 'numero transferencia':
        this.columnaBuscar = 'id';
        break;

      default:
        this.columnaBuscar = event.detail.value;
        break;
    }
  }
  onSearchChange(event) {
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if (this.textoBuscar === '') {
      this.bubbles = false;
    } else if (this.columnaBuscar === '') {
      this.presentToast('Selecciona un campo', 'danger');
    }
    this.bubbles = false;
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
