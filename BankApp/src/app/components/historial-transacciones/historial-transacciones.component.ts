import { Component, OnInit, Input } from '@angular/core';
import { Transferencia } from '../../interfaces/interfaces';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.scss'],
})
export class HistorialTransaccionesComponent implements OnInit {
  @Input() transferencias: Transferencia[];
  @Input() isAdmin: boolean;
  constructor() { }

  ngOnInit() {}

}
