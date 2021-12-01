import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from 'src/app/services/dynamo-db.service';
import { User } from '../../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  minDate = (new Date()).getFullYear()-18;
  user: User = {
    usuario: '',
    password: '',
    rol: '',
    nombre: '',
    direccion: '',
    nacimiento: new Date(),
    telefono: ''
  }
  users: User[] = [];
  constructor(private toastController: ToastController, private db: DynamoDBService) { }

  ngOnInit() {
    console.log(this.minDate);

    //Mostrar todos los usuarios creados (admin)
    this.db.getUsers().then(resp =>{
      this.users = resp.data;
      console.log(this.users);
    });
  }

  //Crear usuario
  async onSubmit( formulario: NgForm ) {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(this.user.password, 'secret key 123').toString();
    this.user.password = ciphertext;
    this.db.createUser(this.user).then(response =>{
      if(response){
        formulario.resetForm();
        this.presentToast('Usuario creado satisfactoriamente', 'success');
      }else{
        this.presentToast('Error al crear el usuario', 'danger');
      }
    });
  }
  getItem(event){
    //this.user.categoria = this.categorias.find(cat => cat.nombre === event.detail.value);
  }
  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'center',
      duration: 1000,
      color: color
    });
    toast.present();
  }

}
