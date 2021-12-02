import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User, Cuenta } from '../../interfaces/interfaces';
import * as CryptoJS from 'crypto-js';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {

  checked: boolean;
  minDate = (new Date()).getFullYear()-18;
  user: User = {
        usuario: '',
        password: '',
        rol: '',
        nombre: '' ,
        direccion: '',
        nacimiento: null,
        telefono:'',
    };
  public opt = [
    { val: 'Monetaria', isChecked: true },
    { val: 'Ahorro', isChecked: false }];
  constructor(private toastController: ToastController,private modalCtrl: ModalController, private db: DynamoDBService) { }

  ngOnInit() {
    this.init();
  }
  async init(){
    this.checked = false;
  }
  async crearCuentaMonetaria(){
    let cuenta: Cuenta = {
      usuario: this.user.usuario,
      numeroCuenta: 'sdfsd',
      saldo: 1000.00,
      estado: 'activa'
    };
    console.log(cuenta);
    this.db.createMonetary(cuenta);
    if (!this.checked) {
      cuenta.saldo = 0;
     this.db.createAccount(cuenta);
    }
  }

  //Crear usuario
  async onSubmit( formulario: NgForm ) {
    this.user.password = this.encrypt();

    if(this.user !== null  && this.user.nacimiento !== null){
      this.crearUsuario();
      this.salirModal();
    }else{
      this.presentToast('Llena todos los campos','danger');
    }
  }

  crearUsuario(): boolean{
    this.user.rol = 'usuario';
    this.db.createUser(this.user).then(response =>{
      if(response){
        this.presentToast('Usuario creado satisfactoriamente', 'success');
        this.crearCuentaMonetaria();
        return true;
      }else{
        this.presentToast('Error al crear el usuario', 'danger');
        return false;
      }
    });
    return false;
  }
   // Encrypt
  encrypt(){
    const ciphertext = CryptoJS.AES.encrypt(this.user.password, 'secret key 123').toString();
    return ciphertext;
  }

  getDateItem(event){
    //formatDate(event.detail.value, 'yyyy-MM-dd', 'en-US');
    this.user.nacimiento = event.detail.value;
    console.log(this.user.nacimiento);
  }

  isChecked(event){
    this.checked = event.currentTarget.checked;
  }
  salirModal(){
    this.modalCtrl.dismiss();
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
