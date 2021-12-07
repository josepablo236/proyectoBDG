/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { Cuenta } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bubbles = false; //variable para mostrar el spinnig bubbles
  isAdmin= false;
  textoBuscar= '';
  actualUser: string;
  cuentas: Cuenta[] =[];
  cuentasAhorro: Cuenta[] =[];
  constructor(private db: DynamoDBService,
              private router: Router,
              private toastController: ToastController) {
                this.init();
              }
  getFavorites(){
  }

  onSearchChange(event){
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if(true){
    setTimeout(() => {
      }, 1000);
    }else{
      setTimeout(() => {
        this.bubbles = false;
        }, 500);
    }
    if(this.textoBuscar === ''){
      this.bubbles = false;
    }
  }
  createTransfer(){

  }
  transferir(usuario: string){}
  historial(){}
  blockAccount(usuario: string){}
  async init(){
    this.bubbles = true;
    this.isAdmin = await this.db.isAdmin;
    this.actualUser = await this.db.currentUser;
    if (this.isAdmin) {
      this.db.getMonetaryAcounts().then(resp =>{
        this.cuentas =(resp.data['monetarias']);
        });
        this.db.getAcounts().then(resp =>{
          this.cuentasAhorro =(resp.data['cuentas']);
          });
      }
      else{
        //metodo para llamar las favoritas de los usuarios
      }
      this.bubbles = false;
  }
  async ionViewWillEnter(){
    const user = await this.db.currentUser;
    if( user === '' || user === undefined){
        await this.presentToast('Sesion expirada','danger');
        this.router.navigate(['/']);
    }
  }
  async presentToast(_message: string, _color: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: _message,
      duration: 1000,
      color: _color,
    });
    toast.present();
  }

  doRefresh(event){
    setTimeout(async() => {
      await this.db.getMonetaryAcounts().then(resp =>{
        this.cuentas =(resp.data['monetarias']);
        });
      await this.db.getAcounts().then(resp =>{
        this.cuentasAhorro =(resp.data['cuentas']);
        });
      event.target.complete();
    }, 1500);
  }

}
