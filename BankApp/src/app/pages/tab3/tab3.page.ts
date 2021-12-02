import { Component } from '@angular/core';
import { Transferencia } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  transferencias: Transferencia[]= [];
  transferencia: Transferencia = {
    id: 'dasdsa',
    destinatario: 'olll',
    remitente: 'xs',
    cantidad: 213123,
    fecha: new Date(),
  };
  bubbles = false;
  textoBuscar='';
  constructor() {
  }
  onSearchChange(event){
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if(true){
    setTimeout(() => {
      //this.transferencias = db.transfilter
      }, 1000);
    }else{
      setTimeout(() => {
        this.bubbles = false;
        //this.transferencias = db.transfavoritas
        }, 500);
    }
    if(this.textoBuscar === ''){
      this.bubbles = false;
    }
  }
}
