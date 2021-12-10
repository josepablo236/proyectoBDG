import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User, Cuenta } from '../../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {
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
  public opt = [
    { val: 'Monetaria', isChecked: true },
    { val: 'Ahorro', isChecked: false },
  ];
  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private db: DynamoDBService
  ) {}

  ngOnInit() {
    this.init();
  }
  async init() {
    this.checked = false;
    //password definido
    this.user.password = '12345';
  }
  //metodo para crear cuentas
  async crearCuentas() {
    const cuenta: Cuenta = {
      usuario: this.user.usuario,
      numeroCuenta: uuidv4().substring(0, 8),
      saldo: 1000.0,
      estado: 'activa',
      tipo: 'monetaria',
    };

    //metodo de la db para crear cuentas monetarias
    this.db.createMonetary(cuenta);
    if (this.checked) {
      //cuenta de ahorro creada
      cuenta.numeroCuenta = uuidv4().substring(0, 8);
      cuenta.tipo = 'ahorro';
      cuenta.saldo = 0;
      this.db.createAccount(cuenta);
    }
  }

  crearUsuario(): boolean {
    //role y estado asignados por defecto
    this.user.rol = 'usuario';
    this.user.estado = 'activa';
    this.db.createUser(this.user).then((response) => {
      if (response) {
        this.presentToast('Usuario creado satisfactoriamente', 'success');
        this.crearCuentas();
        return true;
      } else {
        this.presentToast('Error al crear el usuario', 'danger');
        return false;
      }
    });
    return false;
  }
  // Encrypt
  encrypt() {
    const ciphertext = CryptoJS.AES.encrypt(
      this.user.password,
      'secret key 123'
    ).toString();
    return ciphertext;
  }

  getDateItem(event) {
    //
    this.user.nacimiento = formatDate(
      event.detail.value,
      'yyyy-MM-dd',
      'en-US'
    );
  }

  isChecked(event) {
    this.checked = !event.currentTarget.checked;
  }

  salirModal() {
    this.modalCtrl.dismiss();
  }
  //Crear usuario
  async onSubmit(formulario: NgForm) {
    this.user.password = this.encrypt();

    if (this.user.nacimiento !== '') {
      this.crearUsuario();
      this.salirModal();
    } else {
      this.presentToast('Llena todos los campos', 'danger');
    }
  }
  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      cssClass: 'center',
      duration: 1000,
      color: toastColor,
    });
    toast.present();
  }
}
