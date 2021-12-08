/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input } from '@angular/core';
import { Cuenta, Transferencia, Favorito } from '../../interfaces/interfaces';
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
  @Input() cuentasFav: Favorito[];
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

  ngOnInit() {
    console.log(this.cuentasFav);
  }

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
    //Validar que si es la misma
    if (this.cuentaEmisora.numeroCuenta === this.transferencia.cuentaDest) {
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta destino no puede ser la misma que la remitente';
      return;
    }
    if (!this.error) {
      this.transferir();
    }
    //Validar que si tenga esa cantidad de dinero para transferir
    if (Number(this.cuentaEmisora.saldo) < Number(this.transferencia.cantidad)) {
      this.alert = true;
      this.error = true;
      this.message = 'Saldo insuficiente para transferir';
      console.log(this.cuentaEmisora.saldo);
      console.log(this.transferencia.cantidad);
      return;
    }
  }
  async onSubmitNewFav() {
    this.alert = false;
    this.error = false;
    if(this.cuenta.usuario === undefined){
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta ingresada no existe'
    }
    let fav: Favorito = {
      numeroCuenta: this.cuenta.numeroCuenta,
      usuario: this.user,
      usuarioCuenta: this.cuenta.usuario,
      estado: this.cuenta.estado,
      tipo: this.cuenta.tipo,
    };
    this.db.createFavorite(fav).then((response) => {
      if (response) {
        this.alert = true;
        this.error = false;
        this.message = 'Cuenta agregada a favoritos';
      } else {
        this.alert = true;
        this.error = true;
        this.message = 'Error al agregar a favoritos';
      }
    });
  }
  agregarfav() {
    this.agregar = false;
  }
  cancelar() {
    this.agregar = false;
  }

  async getuser(event, tipo: string) {
    if (event.detail.value !== '') {
      console.log("ONCHANGEEEE",event.detail.value);
      await this.getpersonalAccounts(event.detail.value, tipo);
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
      await this.getpersonalAccounts(this.numeroCuentaDest, 'destinatario');
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
      console.log('Destino', this.cuentaDestino);
      this.transferencia.cuentaDest = this.cuentaDestino.numeroCuenta;
      this.transferencia.destinatario = this.cuentaDestino.usuario;
    } else if (tipo === 'remitente') {
      this.cuentaEmisora = this.cuenta;
      console.log("Emisora",this.cuentaEmisora);
      this.transferencia.cuentaRemi = this.cuentaEmisora.numeroCuenta;
      this.transferencia.remitente = this.cuentaEmisora.usuario;
      console.log("Transfer", this.transferencia);
    }

    this.transferencia.fecha = formatDate(
      new Date(),
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    console.log(this.transferencia);
  }

  async transferir() {
    //Crear transferencia
    await this.db.createTrans(this.transferencia).then(async(response) => {
      if (response) {
        console.log(this.cuentaDestino.tipo);
        //Modificar saldo en cuenta destino
        if (this.cuentaDestino.tipo === 'monetaria') {
          //Modificar saldo de cuenta monetaria
          let nuevoSaldo = Number(this.cuentaDestino.saldo) + Number(this.transferencia.cantidad);
          await this.db.modifyMonetary(this.cuentaDestino.usuario,'saldo', nuevoSaldo.toString());
        }
        if (this.cuentaDestino.tipo === 'ahorro') {
          //Modificar saldo de cuenta ahorro
          let nuevoSaldo = Number(this.cuentaDestino.saldo) + Number(this.transferencia.cantidad);
          console.log(nuevoSaldo);
          await this.db.modifyAccount(this.cuentaDestino.numeroCuenta,'saldo', nuevoSaldo.toString());
        }
        //Modificar saldo en cuenta remitente
        if(this.cuentaEmisora.tipo === 'monetaria'){
          //Modificar saldo de cuenta monetaria
          let nuevoSaldo = Number(this.cuentaEmisora.saldo) - Number(this.transferencia.cantidad);
          console.log(nuevoSaldo);
          await this.db.modifyMonetary(this.cuentaEmisora.usuario,'saldo',nuevoSaldo.toString());
        }
        if (this.cuentaEmisora.tipo === 'ahorro') {
          //Modificar saldo de cuenta ahorro
          let nuevoSaldo = Number(this.cuentaEmisora.saldo) - Number(this.transferencia.cantidad);
          await this.db.modifyAccount(this.cuentaEmisora.numeroCuenta,'saldo', nuevoSaldo.toString());
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
}
