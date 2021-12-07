import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transferencia } from '../../interfaces/interfaces';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.scss'],
})
export class HistorialTransaccionesComponent implements OnInit {
  @Input() transferencias: Transferencia[];
  @Input() isAdmin: boolean;
  @Input() menu: boolean;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  regresar() {
    this.modalController.dismiss();
  }
}
