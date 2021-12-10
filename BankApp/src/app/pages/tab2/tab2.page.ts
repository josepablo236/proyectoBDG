/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta, User, Favorito } from '../../interfaces/interfaces';
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
  columnaBuscar = '';
  currentUser = {
    usuario: undefined,
    isAdmin: false,
  };
  cuentas: Cuenta[] = [];
  cuentasAhorro: Cuenta[] = [];
  favoritas: Favorito[] = [];
  cuenta: Cuenta;
  cuentasUsuario: Cuenta[] = [];
  campos = ['numero cuenta', 'usuario', 'saldo', 'estado', 'tipo'];
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.bubbles = true;
  }

  doRefresh(event) {
    setTimeout(async () => {
      this.init();
      event.target.complete();
    }, 1500);
  }

  getColumnText(event) {
    switch (event.detail.value) {
      case 'numero cuenta':
        this.columnaBuscar = 'numeroCuenta';
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
  async createTransfer() {
    await this.getpersonalAccounts();

    this.mostrarModalCreateTrans(
      this.currentUser.usuario,
      this.cuentasUsuario,
      this.cuentas
    );
  }

  async getpersonalAccounts() {
    this.cuentasUsuario = [];

    await this.db.getUserAccounts(this.currentUser.usuario).then((resp) => {
      this.cuentasUsuario = resp.data['cuentas'];
    });

    await this.db.getMonetary(this.currentUser.usuario).then((resp) => {
      this.cuentasUsuario.push(resp.data);
    });
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
  restart() {
    this.cuentasAhorro = [];
    this.cuentas = [];
    this.favoritas = [];
    this.textoBuscar = '';
    this.columnaBuscar = '';
  }
  async init() {
    this.restart();
    this.currentUser = await this.storage.getCurrentUser();
    if (this.currentUser.isAdmin) {
      await this.db.getMonetaryAcounts().then((resp) => {
        this.cuentas = resp.data['monetarias'];
      });
      await this.db.getAcounts().then((resp) => {
        this.cuentasAhorro = resp.data['cuentas'];
      });
    } else if (this.currentUser.usuario !== undefined) {
      await this.db.getUserFavorites(this.currentUser.usuario).then((resp) => {
        this.favoritas = resp.data['cuentas'];
      });

      for (const fav of this.favoritas) {
        if (fav.tipo === 'monetaria') {
          await this.db.getMonetary(fav.usuarioCuenta).then((resp) => {
            this.cuenta = resp.data;
          });
          this.cuentas.push(this.cuenta);
        } else if (fav.tipo === 'ahorro') {
          await this.db.getAccount(fav.numeroCuenta).then((resp) => {
            this.cuenta = resp.data;
          });
          this.cuentas.push(this.cuenta);
        }
      }
    }
    this.bubbles = false;
  }
  //Modal de crear transferencia
  async mostrarModalCreateTrans(
    user: string,
    cuentasUsuario: Cuenta[],
    cuentasFav: Cuenta[]
  ) {
    const modal = await this.modalController.create({
      component: TransferenciaComponent,
      componentProps: {
        user,
        cuentasUsuario,
        cuentasFav,
      },
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
