import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';


@NgModule({
  declarations: [ HistorialTransaccionesComponent,TransferenciaComponent],
  exports: [ HistorialTransaccionesComponent,TransferenciaComponent],
  imports: [
    CommonModule,IonicModule
  ]
})
export class ComponentsModule { }
