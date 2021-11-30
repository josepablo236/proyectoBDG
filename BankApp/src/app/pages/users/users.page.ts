import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  minDate = (new Date()).getFullYear()-18;
  constructor(private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.minDate);
  }
  async onSubmit( formulario: NgForm ) {
    if(true){
      formulario.resetForm();
    }else{
      this.presentToast();
    }
  }
  getItem(event){
    //this.user.categoria = this.categorias.find(cat => cat.nombre === event.detail.value);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario agregado con éxito',
      duration: 1000,
      color: 'primary'
    });
    toast.present();
  }

}
