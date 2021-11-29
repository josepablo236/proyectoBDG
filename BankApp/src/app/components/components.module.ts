import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateUsersComponent } from './create-users/create-users.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';



@NgModule({
  declarations: [CreateUsersComponent, HistorialTransaccionesComponent,TransferenciaComponent],
  exports: [CreateUsersComponent, HistorialTransaccionesComponent,TransferenciaComponent],
  imports: [
    CommonModule,IonicModule
  ]
})
export class ComponentsModule { }
