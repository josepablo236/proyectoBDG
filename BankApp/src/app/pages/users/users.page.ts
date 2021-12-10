/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';
import { User, Cuenta } from '../../interfaces/interfaces';
import { CreateUsersPage } from '../create-users/create-users.page';
import { UserInfoPage } from '../user-info/user-info.page';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  checked: boolean;
  minDate = new Date().getFullYear() - 18;
  user: User = {
    usuario: '',
    password: '',
    rol: '',
    nombre: '',
    direccion: '',
    nacimiento: '',
    telefono: '',
  };
  users: User[] = [];
  currentUser = {
    usuario: undefined,
    isAdmin: true,
  };
  constructor(
    private db: DynamoDBService,
    private storage: DataLocalService,
    private router: Router,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.getUsers();
  }

  doRefresh(event) {
    setTimeout(async () => {
      await this.db.getUsers().then((resp) => {
        this.users = resp.data['usuarios'];
      });
      event.target.complete();
    }, 1500);
  }

  eliminar(user: User) {
    if (user.usuario !== 'admin') {
      this.presentAlertConfirm(
        'Eliminar Usuario',
        `¿Deseas eliminar a ${user.usuario}?`,
        'eliminar', //cambiar estado
        user
      );
    }
  }

  async eliminarUsuario(user: User) {
    //Eliminar al usuario
    await this.db.deleteUser(user.usuario).then((resp) => {
      if (resp) {
        this.presentToast('Usuario eliminado', 'success');
      } else {
        this.presentToast('Error al eliminar', 'danger');
      }
    });
    //Eliminar cuenta monetaria del usuario
    await this.db.deleteMonetary(user.usuario).then((resp) => {
      if (resp) {
        this.presentToast('Cuenta monetaria eliminada', 'success');
      } else {
        this.presentToast('Error al eliminar cuenta monetaria', 'danger');
      }
    });

    //Eliminar cuentas de ahorro del usuario
    await this.db.getUserAccounts(user.usuario).then((r) => {
      const cuentas: Cuenta[] = r.data['cuentas'];
      if (cuentas.length > 0) {
        for (const cuenta of cuentas) {
          this.db.deleteAccount(cuenta.numeroCuenta).then((resp) => {
            if (resp) {
              this.presentToast('Cuenta eliminada', 'success');
            } else {
              this.presentToast('Error al eliminar cuenta', 'danger');
            }
          });
        }
      }
    });
  }
  cerrarSesion() {
    this.presentAlertConfirm(
      'Cerrar Sesión',
      'Deseas cerrar sesion',
      'endsesion' //cerrar sesion
    );
  }

  bannearUsuario(user: User) {
    if (user.usuario !== 'admin') {
      let mensaje;
      let header;

      if (user.estado === 'activa') {
        header = 'Bannear usuario';
        mensaje = `¿Deseas bannear a ${user.usuario}?`;
      } else {
        header = 'Desbannear usuario';
        mensaje = `¿Deseas desbannear a ${user.usuario}?`;
      }

      this.presentAlertConfirm(
        header,
        mensaje,
        'estado', //cambiar estado
        user
      );
    }
  }

  async ionViewWillEnter() {
    this.currentUser = await this.storage.getCurrentUser();
    if (this.currentUser === undefined) {
      await this.presentToast('Sesion expirada', 'danger');
      this.router.navigate(['/']);
    } else {
      await this.getUsers();
    }
  }

  //metodo para obtener todos los usuarios
  async getUsers() {
    await this.db.getUsers().then((resp) => {
      this.users = resp.data['usuarios'];
    });
  }
  //metodo para modificar el estado del usuario y todas sus cuentas monetaria/ahorro
  async modifyUser(user: User, estado: string) {
    let cuentasAhorro: Cuenta[] = [];
    //obtener todas las cuentas de ahorro del usuario
    await this.db.getUserAccounts(user.usuario).then((resp) => {
      cuentasAhorro = resp.data['cuentas'];
    });
    await this.db.modifyPass(user.usuario, 'estado', estado);

    await this.db.modifyMonetary(user.usuario, 'estado', estado);
    //cambiar el nuevo estado de las cuentas de ahorro
    await cuentasAhorro.forEach((cuenta) => {
      this.db.modifyAccount(cuenta.numeroCuenta, 'estado', estado);
    });
  }

  //Mostrar Modales
  //Modal de crear usuario
  async mostrarModalCreate() {
    const modal = await this.modalCtrl.create({
      component: CreateUsersPage,
      componentProps: {},
    });
    await modal.present();
    await this.getUsers();
    modal.onWillDismiss();
  }

  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: toastColor,
    });
    toast.present();
  }

  async presentAlertConfirm(
    _header: string,
    _message: string,
    action: string,
    user?: User
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
              case 'endsesion':
                this.currentUser = {
                  usuario: undefined,
                  isAdmin: false,
                };
                this.storage.guardarCurrentUser(this.currentUser);
                this.router.navigate(['/']);
                break;
              case 'estado':
                if (user.estado === 'activa') {
                  toastColor = 'danger';
                  toastMessage = 'Usuario banneado';
                  estado = 'inactiva';
                } else {
                  toastColor = 'success';
                  toastMessage = 'Usuario desbanneado';
                  estado = 'activa';
                }
                this.modifyUser(user, estado);
                this.presentToast(toastMessage, toastColor);
                break;
              case 'eliminar':
                this.eliminarUsuario(user);
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
}
