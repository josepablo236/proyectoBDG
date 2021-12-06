import { Component, OnInit, Input } from '@angular/core';
import { Cuenta, Transferencia } from '../../interfaces/interfaces';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {

  @Input() user: string;
  transferencia: Transferencia;
  constructor(private db: DynamoDBService,
              private toastController: ToastController) { }

  ngOnInit() {}

  async onSubmit( formulario: NgForm ) {
    if('' === ''){
    }else{
      this.presentToast('Llena todos los campos','danger');
    }
  }

  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      cssClass: 'center',
      duration: 1000,
      color: toastColor,
    });
    toast.present();
  }
}
