import { Component, OnInit, Input } from '@angular/core';
import { Cuenta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {

  @Input() cuentas: Cuenta[];
  @Input() isAdmin: boolean;
  constructor() { }

  ngOnInit() {}
  onClick(){
  }
}
