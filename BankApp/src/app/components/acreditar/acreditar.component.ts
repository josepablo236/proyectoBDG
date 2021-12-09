import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';
import { Cuenta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-acreditar',
  templateUrl: './acreditar.component.html',
  styleUrls: ['./acreditar.component.scss'],
})
export class AcreditarComponent implements OnInit {
  @Input() cuenta: Cuenta;
  alert = false;
  error = false;
  message: string;
  cantidad: number;
  constructor(
    private db: DynamoDBService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  setCantidad(event) {
    this.cantidad = Number(event.detail.value);
  }

  regresar() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.alert = false;
    this.error = false;
    if (this.cantidad < 1) {
      this.alert = true;
      this.error = true;
      this.message = 'La cantidad debe ser mayor a 0';
      return;
    }
    if (this.cantidad === undefined) {
      this.alert = true;
      this.error = true;
      this.message = 'Debe ingresar una cantidad';
      return;
    }
    if (this.cuenta.estado === 'inactiva') {
      this.alert = true;
      this.error = true;
      this.message = 'La cuenta está bloqueada';
      return;
    }
    const nuevoSaldo = Number(this.cuenta.saldo) + Number(this.cantidad);
    if (this.cuenta.tipo === 'monetaria') {
      //Modificar saldo de cuenta monetaria
      this.db
        .modifyMonetary(this.cuenta.usuario, 'saldo', nuevoSaldo.toString())
        .then((resp) => {
          //Validar si resp es true
          if (resp) {
            this.alert = true;
            this.error = false;
            this.message = 'Acreditación exitosa';
          } else {
            this.alert = true;
            this.error = true;
            this.message = 'Error al acreditar';
          }
        });
    }
    if (this.cuenta.tipo === 'ahorro') {
      //Modificar saldo de cuenta ahorro
      this.db
        .modifyAccount(this.cuenta.numeroCuenta, 'saldo', nuevoSaldo.toString())
        .then((resp) => {
          //Validar si resp es true
          if (resp) {
            this.alert = true;
            this.error = false;
            this.message = 'Acreditación exitosa';
          } else {
            this.alert = true;
            this.error = true;
            this.message = 'Error al acreditar';
          }
        });
    }
  }
}
