import { Component, OnInit, Input } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  @Input() cuentas: Cuenta[];
  @Input() isAdmin: boolean;
  constructor(private db: DynamoDBService) { }

  ngOnInit() {}
  createSavingAccount(_usuario: string){
    const cuenta: Cuenta = {
      usuario: _usuario,
      numeroCuenta:  uuidv4(),
      saldo: 0,
      estado: 'activa',
    };
    this.db.createAccount(cuenta);
  }
  blockAccount(_usuario: string){
    this.db.deleteMonetary(_usuario);
  }
  createtransfer(){

  }
}
