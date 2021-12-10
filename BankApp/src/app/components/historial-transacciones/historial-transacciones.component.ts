import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transferencia, Cuenta } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.scss'],
})
export class HistorialTransaccionesComponent {
  @Input() transferencias: Transferencia[];
  @Input() numeroCuenta: string;
  @Input() isAdmin: boolean;
  @Input() menu: boolean;
  currentUser = {
    usuario: undefined,
    isAdmin: false,
  };
  constructor(
    private modalController: ModalController,
    private storage: DataLocalService
  ) {
    this.init();
  }
  async init() {
    this.currentUser = await this.storage.getCurrentUser();
  }
  async ionViewWillEnter() {
    await this.init();
  }
  regresar() {
    this.modalController.dismiss();
  }
}
