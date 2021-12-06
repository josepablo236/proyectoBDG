/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { Transferencia, User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  transferencias: Transferencia[]= [];
  isAdmin = false;
  actualUser: string;
  bubbles = true;
  textoBuscar='';
  constructor(private db: DynamoDBService,
              private router: Router,
              private toastController: ToastController) {
                this.init();
  }
  async init(){
    this.bubbles = true;
    this.isAdmin = await this.db.isAdmin;
    this.actualUser = await this.db.currentUser;
    if (this.isAdmin) {
      this.db.getTransfers().then(resp =>{
        this.transferencias = resp.data['transferencias'];
        });
      }
      else{
        this.db.getUserTrans(this.actualUser).then(resp =>{
          this.transferencias = resp.data['trans'];
          });
      }
      this.bubbles = false;
  }

  onSearchChange(event){
    this.bubbles = true;
    this.textoBuscar = event.detail.value;
    if(true){
    setTimeout(() => {
      //this.transferencias = db.transfilter
      }, 1000);
    }else{
      setTimeout(() => {
        this.bubbles = false;
        //this.transferencias = db.transfavoritas
        }, 500);
    }
    if(this.textoBuscar === ''){
      this.bubbles = false;
    }
  }
  async ionViewWillEnter(){
    const user = await this.db.currentUser;
    if( user === '' || user === undefined){
        await this.presentToast('Sesion expirada','danger');
        this.router.navigate(['/']);
    }else{
      this.init();
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
}
