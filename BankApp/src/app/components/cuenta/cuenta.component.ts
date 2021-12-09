/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta, Transferencia, Favorito } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { HistorialTransaccionesComponent } from '../historial-transacciones/historial-transacciones.component';
import { DataLocalService } from '../../services/data-local.service';
import { AcreditarComponent } from '../acreditar/acreditar.component';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  @Input() cuentas: Cuenta[];
  @Input() currentUser: any;
  @Input() monetary: boolean;
  @Input() usuario: string;
  cuentasFav: Favorito[] = [];
  transferencias: Transferencia[] = [];
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  createSavingAccount(_cuenta: Cuenta) {
    const cuenta: Cuenta = {
      usuario: _cuenta.usuario,
      numeroCuenta: uuidv4().substring(0, 8),
      saldo: 0,
      estado: 'activa',
      tipo: 'ahorro',
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

  async acreditar(cuenta: Cuenta) {
    this.mostrarModalAcreditar(cuenta);
  }
  async mostrarModalAcreditar(cuenta: Cuenta) {
    const modal = await this.modalController.create({
      component: AcreditarComponent,
      componentProps: {
        cuenta,
      },
    });
    await modal.present();
    modal.onWillDismiss();
  }

  async transferir(cuenta: Cuenta) {
    let cuentasPersonales;
    if (!this.currentUser.isAdmin) {
      cuentasPersonales = await this.getAccounts(this.usuario);
    }
    //getFavAccoutns
    await this.db.getUserFavorites(this.usuario).then((resp) => {
      this.cuentasFav = resp.data['cuentas'];
    });

    this.mostrarModalCreateTrans(
      this.usuario,
      cuentasPersonales,
      this.cuentasFav,
      cuenta.numeroCuenta
    );
  }
  async mostrarModalCreateTrans(
    user: string,
    cuentasUsuario: Cuenta[],
    cuentasFav: Favorito[],
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

  async getAccounts(usuario: string) {
    const cuentas: Cuenta[] = [];
    await this.db.getMonetary(usuario).then((resp) => {
      cuentas.push(resp.data);
    });

    await this.db.getUserAccounts(usuario).then((resp) => {
      cuentas.push(...resp.data['cuentas']);
    });

    return cuentas;
  }
  async historial(cuenta: Cuenta) {
    if (!this.currentUser.isAdmin){
       await this.db.getUserTrans(this.currentUser.usuario).then((resp) => {
         this.transferencias = resp.data['trans'];
         this.transferencias = this.transferencias.filter(
           (x) => x.destinatario === cuenta.usuario
         );
         console.log(resp.data);
       });
       console.log(this.transferencias);
    }
    else{
      await this.db.getAccountTrans(cuenta.numeroCuenta).then((resp) => {
        this.transferencias = resp.data['trans'];
        console.log(resp.data);
      });
      console.log(this.transferencias);
    }
    this.mostrarModalTransaccion(this.transferencias, '', false, true);
  }

  async mostrarModalTransaccion(
    transferencias: Transferencia[],
    cuenta: string,
    isAdmin: boolean,
    menu: boolean
  ) {
    const modal = await this.modalController.create({
      component: HistorialTransaccionesComponent,
      componentProps: {
        transferencias,
        cuenta,
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
