import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bubbles = false; //variable para mostrar el spinnig bubbles
  isAdmin: boolean;
  textoBuscar= '';
  cuentas: Cuenta[] =[];
  cuenta: Cuenta = {
    numeroCuenta:'sad',
    usuario: 'dsa',
    saldo: 1500,
    estado: 'activa'
  };

  constructor(private db: DynamoDBService) {
    this.init();
  }
  async init(){
   // this.isAdmin= await this.db.isAdmin();
  }
  getFavorites(){

  }
  onSearchChange(event){
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if(true){
    setTimeout(() => {
      }, 1000);
    }else{
      setTimeout(() => {
        this.bubbles = false;
        }, 500);
    }
    if(this.textoBuscar === ''){
      this.bubbles = false;
    }
  }
}
