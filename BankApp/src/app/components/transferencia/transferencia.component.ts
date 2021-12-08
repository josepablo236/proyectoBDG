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
  cuentaDestino: Cuenta;
  cuentaEmisora: Cuenta;
  cuenta: Cuenta;
  alert = false;
  error = false;
  message: string;
  agregar = false;
  //saldo: number;
  editCuentaDest = false;
  _fecha: string;
  transferencia: Transferencia = {
    id: uuidv4().substring(0,8),
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
    this.alert = false;
    this.error = false;
    //Validar que llene todos los campos
    if (
      this.transferencia.cuentaRemi === '' ||
      this.transferencia.cantidad === 0 ||
      this.transferencia.descripcion === ''
    ) {
      this.alert = true;
      this.error = true;
      this.message = 'Llena todos los campos';
      return;
    }
    //Validar que exista la cuenta destino
    if (this.cuentaDestino.usuario === undefined) {
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta destino no existe';
      return;
    }
    //Validar si está bloqueada
    if (this.cuentaDestino.estado === 'inactiva') {
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta destino está bloqueada';
      return;
    }
    //Validar que si tenga esa cantidad de dinero para transferir
    if (this.cuentaEmisora.saldo < this.transferencia.cantidad) {
      this.alert = true;
      this.error = true;
      this.message = 'Saldo insuficiente para transferir';
      return;
    }
    //Validar que si es la misma
    if (this.cuentaEmisora.numeroCuenta === this.transferencia.cuentaDest) {
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta destino no puede ser la misma que la remitente';
      return;
    }
    if(!this.error){
      this.transferir();
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
    if (event.detail.value !== '') {
      this.getpersonalAccounts(event.detail.value, tipo);
    }
  }

  setCantidad(event) {
    this.transferencia.cantidad = event.detail.value;
  }

  setDescription(event) {
    this.transferencia.descripcion = event.detail.value;
  }

  async ionViewWillEnter() {
    if (this.numeroCuentaDest !== '') {
      console.log(this.numeroCuentaDest);
      this.getpersonalAccounts(this.numeroCuentaDest, 'destinatario');
    }
  }

  async getpersonalAccounts(cuentadest: string, tipo: string) {
    
    await this.db.getNumMonetary(cuentadest).then((resp) => {
      this.cuenta = resp.data['cuentas'][0];
    });
    if (this.cuenta === undefined) {
      await this.db.getAccount(cuentadest).then((resp) => {
        this.cuenta = resp.data;
      });
    }

    if (tipo === 'destinatario') {
      this.cuentaDestino = this.cuenta;
      this.transferencia.cuentaDest = this.cuentaDestino.numeroCuenta;
      this.transferencia.destinatario = this.cuentaDestino.usuario;
    } else if (tipo === 'remitente') {
      this.cuentaEmisora = this.cuenta;
      this.transferencia.cuentaRemi = this.cuentaEmisora.numeroCuenta;
      this.transferencia.remitente = this.cuentaEmisora.usuario;
    }

    this.transferencia.fecha = formatDate(
      new Date(),
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    console.log(this.transferencia);
  }

  transferir() {
    //Crear transferencia
    this.db.createTrans(this.transferencia).then((response) => {
      if (response) {
        console.log(this.cuentaDestino.tipo);
        //Modificar saldo en cuenta destino
        if (this.cuentaDestino.tipo === 'monetaria') {
          //Modificar saldo de cuenta monetaria
          let nuevoSaldo = Number(this.cuentaDestino.saldo) + Number(this.transferencia.cantidad);
          this.db.modifyMonetary(this.cuentaDestino.usuario,'saldo', nuevoSaldo.toString());
        }
        if (this.cuentaDestino.tipo === 'ahorro') {
          //Modificar saldo de cuenta ahorro
          let nuevoSaldo = Number(this.cuentaDestino.saldo) + Number(this.transferencia.cantidad);
          console.log(nuevoSaldo);
          this.db.modifyAccount(this.cuentaDestino.numeroCuenta,'saldo', nuevoSaldo.toString());
        }
        //Modificar saldo en cuenta remitente
        if(this.cuentaEmisora.tipo === 'monetaria'){
          //Modificar saldo de cuenta monetaria
          let nuevoSaldo = Number(this.cuentaEmisora.saldo) - Number(this.transferencia.cantidad);
          console.log(nuevoSaldo);
          this.db.modifyMonetary(this.cuentaEmisora.usuario,'saldo',nuevoSaldo.toString());
        }
        if (this.cuentaEmisora.tipo === 'ahorro') {
          //Modificar saldo de cuenta ahorro
          let nuevoSaldo = Number(this.cuentaEmisora.saldo) - Number(this.transferencia.cantidad);
          this.db.modifyAccount(this.cuentaEmisora.numeroCuenta,'saldo', nuevoSaldo.toString());
        }
        this.alert = true;
        this.error = false;
        this.message = 'Transferencia exitosa';
      } else {
        this.alert = true;
        this.error = true;
        this.message = 'Error en la transferencia';
        return;
      }
    });
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
