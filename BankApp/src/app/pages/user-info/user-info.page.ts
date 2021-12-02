import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { DynamoDBService } from '../../services/dynamo-db.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  @Input() user: User;
  edit = false;
  alert = false;
  error = false;
  cambiarFoto = false;
  password: string;
  confirmPassword: string;
  message: string;
  imgPath: any;
  constructor(private modalController: ModalController,private db: DynamoDBService) {
  }

  ngOnInit() {
    if(this.user.img === undefined){
      this.imgPath= '../../../assets/images/profile-photo/empty.png';
    }
    else{
      this.imgPath = this.user.img;
    }
    console.log(this.user);
  }
  regresar(){
    this.modalController.dismiss();
    this.alert = false;
  }

  cambiarPass( formulario: NgForm){
    this.alert = false;
    if(this.password === this.confirmPassword)
    {
      if(this.password.length > 4){
        const ciphertext = CryptoJS.AES.encrypt(this.password, 'secret key 123').toString();
        //Modificar contraseña de usuario
        this.db.modifyPass(this.user.usuario,'password', ciphertext).then(resp =>{
          //Validar si resp es true
          if(resp){
            this.error = false;
            this.alert = true;
            this.message = 'Contraseña actualizada';
          }
          else{
            this.error = true;
            this.alert = true;
            this.message = 'Error al actualizar';
          }
        });
        formulario.resetForm();
      }
      else{
        this.error = true;
        this.alert = true;
        this.message = 'La contraseña es muy corta';
        formulario.resetForm();
      }
    }
    else{
      this.error = true;
      this.alert = true;
      this.message = 'Las contraseñas no coinciden';
      formulario.resetForm();
    }
  }

  async actualizarUser( formulario: NgForm) {
    if(this.user !== null && this.user.rol !=='' && this.user.nacimiento !== null){
      await this.db.createUser(this.user).then(response =>{
        console.log(response);
        if(response){
          this.error = false;
          this.alert = true;
          this.message = 'Información actualizada';
        }else{
          this.error = true;
          this.alert = true;
          this.message = 'Error al actualizar';
        }
      });
    }else{
      this.error = true;
      this.alert = true;
      this.message = 'Llena todos los campos';
    }
  }
  salirModal(){
    this.modalController.dismiss();
    this.alert = false;
  }

}
