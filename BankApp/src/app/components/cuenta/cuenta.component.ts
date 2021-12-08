/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta, Transferencia } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { HistorialTransaccionesComponent } from '../historial-transacciones/historial-transacciones.component';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  @Input() cuentas: Cuenta[];
  @Input() isAdmin: boolean;
  @Input() monetary: boolean;
  transferencias: Transferencia[] = [];
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalControlller: ModalController
  ) {}

  ngOnInit() {}
  createSavingAccount(_cuenta: Cuenta) {
    const cuenta: Cuenta = {
      usuario: _cuenta.usuario,
      numeroCuenta: uuidv4(),
      saldo: 0,
      estado: 'activa',
      tipo: 'ahorro'
    };

    this.presentAlertConfirm(
      'Cuenta de Ahorro',
      `Deseas crearle una cuenta de ahorro a ${_cuenta.usuario}`,
      'savingAccount',
      cuenta
    );
  }
  blockAccount(cuenta: Cuenta) {
    let mensaje;
    let header;
    const tipo = this.monetary ? 'monetaria' : 'de ahorro';
    if (cuenta.estado === 'activa') {
      header = 'Desactivar cuenta';
      mensaje = `¿Deseas desactivar la cuenta ${tipo} de ${cuenta.usuario}?`;
    } else {
      header = 'Activar cuenta';
      mensaje = `¿Deseas activar la cuenta ${tipo} de ${cuenta.usuario}?`;
    }
    this.presentAlertConfirm(header, mensaje, 'blockAccount', cuenta);
  }

  async transferir(cuenta: Cuenta) {
    let cuentasPersonales;
    let cuentasFav = [];
    if (!this.isAdmin) {
      cuentasPersonales = await this.getAccounts(cuenta.usuario);
      cuentasFav = [];
    } else {
      const currentUser = await this.storage.getCurrentUser();
      cuentasPersonales = await this.getAccounts(currentUser);
      cuentasFav = [];
    }
    //getFavAccoutns
    this.mostrarModalCreateTrans(
      cuenta.usuario,
      cuentasPersonales,
      cuentasFav,
      cuenta.numeroCuenta
    );
  }
  async mostrarModalCreateTrans(
    user: string,
    cuentasUsuario: Cuenta[],
    cuentasFav: Cuenta[],
    numeroCuentaDest: string
  ) {
    const modal = await this.modalControlller.create({
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
  async getAccounts(usuario: string) {
    const cuentas: Cuenta[] = [];
    await this.db.getMonetary(usuario).then((resp) => {
      cuentas.push(resp.data);
    });
    console.log(cuentas);

    await this.db.getUserAccounts(usuario).then((resp) => {
      cuentas.push(...resp.data['cuentas']);
    });
    console.log(cuentas);
    return cuentas;
  }
  historial(cuenta: Cuenta) {
    this.db.getTrans(cuenta.numeroCuenta).then((resp) => {
      this.transferencias = resp.data['trans'];
    });

    this.mostrarModalTransaccion(this.transferencias, false, true);
  }
  async mostrarModalTransaccion(
    transacciones: Transferencia[],
    isAdmin: boolean,
    menu: boolean
  ) {
    const modal = await this.modalControlller.create({
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

  async presentAlertConfirm(
    _header: string,
    _message: string,
    action: string,
    cuenta: Cuenta
  ) {
    let toastColor;
    let toastMessage;
    let estado;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: _header,
      message: _message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Aceptar',
          handler: () => {
            switch (action) {
              case 'blockAccount':
                if (cuenta.estado === 'activa') {
                  toastColor = 'danger';
                  toastMessage = 'Cuenta desactivada';
                  estado = 'inactiva';
                } else {
                  toastColor = 'success';
                  toastMessage = 'Cuenta activada';
                  estado = 'activa';
                }
                if (this.monetary) {
                  this.db.modifyMonetary(cuenta.usuario, 'estado', estado);
                } else {
                  this.db.modifyAccount(cuenta.numeroCuenta, 'estado', estado);
                }
                this.presentToast(toastMessage, toastColor);
                break;
              case 'savingAccount':
                this.db.createAccount(cuenta);
                break;

              default:
                break;
            }
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
      duration: 1000,
      color: _color,
    });
    toast.present();
  }
}
