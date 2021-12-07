/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { UserInfoPage } from '../user-info/user-info.page';
import { User, Cuenta, Transferencia } from '../../interfaces/interfaces';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Router } from '@angular/router';
import { HistorialTransaccionesComponent } from '../../components/historial-transacciones/historial-transacciones.component';
import { TransferenciaComponent } from '../../components/transferencia/transferencia.component';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  user: User;
  users: User[];
  bubbles: boolean;
  cuentaMonetaria: Cuenta = {
    numeroCuenta: '',
    usuario: '',
    saldo: 0,
    estado: 'activa',
  };
  cuentas: Cuenta[] = [];
  transferencias: Transferencia[] = [];
  cuentasUsuario: Cuenta[] = [];
  cuentasFavoritas: Cuenta[] = [];
  currentUser = {
    usuario: undefined,
    isAdmin: false,
  };
  constructor(
    private router: Router,
    private db: DynamoDBService,
    private storage: DataLocalService,
    private modalController: ModalController,
    private toastController: ToastController,
    public alertController: AlertController
  ) {
    this.bubbles = true;
    this.init();
  }

  cerrarSesion() {
    this.presentAlertConfirm();
  }

  transferir(numeroCuenta: string) {
    this.getAccounts();
    //getFavAccoutns
    this.mostrarModalCreateTrans(
      this.currentUser.usuario,
      this.cuentasUsuario,
      this.cuentasFavoritas,
      numeroCuenta
    );
  }

  getAccounts() {
    this.cuentasUsuario = this.cuentas.map((cuenta) => cuenta);
    this.cuentasUsuario.push(this.cuentaMonetaria);
  }

  historial(cuenta: Cuenta) {
    this.db.getTrans(cuenta.numeroCuenta).then((resp) => {
      this.transferencias = resp.data['trans'];
    });
    this.mostrarModalTransaccion(this.transferencias, false, true);
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
    await this.getcurrentUser();
    if (this.user !== undefined) {
      await this.getpersonalAccounts();
    }
    this.bubbles = false;
  }

  async getpersonalAccounts() {
    await this.db.getMonetary(this.user.usuario).then((resp) => {
      this.cuentaMonetaria = resp.data;
    });

    await this.db.getUserAccounts(this.user.usuario).then((resp) => {
      this.cuentas = resp.data['cuentas'];
    });
  }
  async getcurrentUser() {
    await this.db.getUsers().then((resp) => {
      this.users = resp.data['usuarios'];
    });
    this.user = this.users.filter(
      (user) => user.usuario === this.currentUser.usuario
    )[0];
  }

  async mostrarModalUsuario(user) {
    await this.getcurrentUser();
    const modal = await this.modalController.create({
      component: UserInfoPage,
      componentProps: {
        user,
      },
    });
    await modal.present();
    modal.onWillDismiss();
  }

  async mostrarModalTransaccion(
    transacciones: Transferencia[],
    isAdmin: boolean,
    menu: boolean
  ) {
    const modal = await this.modalController.create({
      component: HistorialTransaccionesComponent,
      componentProps: {
        transacciones,
        isAdmin,
        menu,
      },
    });
    await modal.present();
    modal.onWillDismiss();
  }
  async mostrarModalCreateTrans(
    user: string,
    cuentasUsuario: Cuenta[],
    cuentasFav: Cuenta[],
    numeroCuentaDest: string
  ) {
    const modal = await this.modalController.create({
      component: TransferenciaComponent,
      componentProps: {
        user,
        cuentasUsuario,
        cuentasFav,
        numeroCuentaDest,
      },
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
          handler: (blah) => {},
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.currentUser = {
              usuario: undefined,
              isAdmin: false,
            };
            this.storage.guardarCurrentUser(this.currentUser);
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(_message: string, _color: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: _message,
      duration: 500,
      color: _color,
    });
    toast.present();
  }
}
