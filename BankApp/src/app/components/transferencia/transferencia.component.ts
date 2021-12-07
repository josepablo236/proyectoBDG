/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { Cuenta, Transferencia } from '../../interfaces/interfaces';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { v4 as uuidv4 } from 'uuid';
import { ModalController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {
  @Input() user: string;
  @Input() cuentasUsuario: Cuenta[];
  @Input() cuentasFav: Cuenta[];
  @Input() numeroCuentaDest: string;

  agregar = false;
  editCuentaDest = false;
  _fecha: string;
  transferencia: Transferencia = {
    id: uuidv4(),
    remitente: '',
    destinatario: '',
    cuentaRemi: '',
    cuentaDest: '',
    descripcion: '',
    cantidad: 0,
    fecha: null,
  };

  constructor(
    private db: DynamoDBService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  regresar() {
    this.modalController.dismiss();
  }
  async onSubmit() {
    if ('' === '') {
    } else {
      this.presentToast('Llena todos los campos', 'danger');
    }
  }
  async onSubmitNewFav() {}
  agregarfav() {
    this.agregar = false;
  }
  cancelar() {
    this.agregar = false;
  }
  getuser(event, tipo: string) {
    console.log(event.detail.value);
    console.log(tipo);

    if (event.detail.value !== '') {
      this.getpersonalAccounts(event.detail.value, tipo);
    }
  }

  async ionViewWillEnter() {
    if (this.numeroCuentaDest !== '') {
      console.log(this.numeroCuentaDest);
      this.getpersonalAccounts(this.numeroCuentaDest, 'destinatario');
    }
  }
  async getpersonalAccounts(cuentadest: string, tipo: string) {
    let cuenta;
    await this.db.getNumMonetary(cuentadest).then((resp) => {
      cuenta = resp.data['cuentas'][0];
    });
    if (cuenta === undefined) {
      console.log('lol');
      await this.db.getAccount(cuentadest).then((resp) => {
        cuenta = resp.data;
      });
    }
    if (tipo === 'destinatario') {
      this.transferencia.cuentaDest = cuenta.numeroCuenta;
      this.transferencia.destinatario = cuenta.usuario;
    } else if (tipo === 'remitente') {
      this.transferencia.cuentaRemi = cuenta.numeroCuenta;
      this.transferencia.remitente = cuenta.usuario;
    }

    this.transferencia.fecha = formatDate(
      new Date(),
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    console.log(this.transferencia);
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
