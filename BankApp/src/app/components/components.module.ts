import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { AlertComponent } from './alert/alert.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { CuentaComponent } from './cuenta/cuenta.component';



@NgModule({
  declarations: [ HistorialTransaccionesComponent,TransferenciaComponent, AlertComponent, UploadImgComponent,CuentaComponent],
  exports: [ HistorialTransaccionesComponent,TransferenciaComponent, AlertComponent, UploadImgComponent,CuentaComponent],
  imports: [
    CommonModule,IonicModule
  ]
})
export class ComponentsModule {
}
