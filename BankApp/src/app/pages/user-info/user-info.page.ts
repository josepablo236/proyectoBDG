import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { DynamoDBService } from '../../services/dynamo-db.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  @Input() user: User;
  edit = false;
  constructor(private modalController: ModalController,private db: DynamoDBService,private toastController: ToastController) {
  }

  ngOnInit() {
    console.log(this.user);
  }
  regresar(){
    this.modalController.dismiss();
  }
  actualizarFoto(){
  }
  async onSubmit( formulario: NgForm) {


    if(this.user !== null && this.user.rol !=='' && this.user.nacimiento !== null){
      if(this.actualizarUsuario()){
        formulario.resetForm();
        this.salirModal();
      }else{
        this.presentToast('Intenta de nuevo','warning');
      }
    }else{
      this.presentToast('Llena todos los campos','danger');
    }
  }

  actualizarUsuario(): boolean{
    //metodo para actualizar los datos del usuario
    return false;
  }
  salirModal(){
    this.modalController.dismiss();
  }

  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      cssClass: 'center',
      duration: 1000,
      color: toastColor,
    });
  }
}
