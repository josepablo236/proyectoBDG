import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;
  bubbles = false;
  constructor(
    private toastController: ToastController,
    private db: DynamoDBService,
    public alertController: AlertController,
    private storage: DataLocalService,
    private router: Router
  ) {}
  ngOnInit() {}
  async guardarCurrentUser(_usuario: any, estado: boolean) {
    const currentUser = {
      usuario: _usuario,
      isAdmin: estado,
    };
    await this.storage.guardarCurrentUser(currentUser);
  }
  async onSubmit(formulario: NgForm) {
    this.bubbles = true;
    await this.db.getUser(this.user, this.pass).then((response) => {
      if (response === 'admin') {
        this.presentToast('Succesful login', 'success');
        this.guardarCurrentUser(this.user, true);
        this.router.navigate(['/user/tabs/users']);
        this.bubbles = false;
        formulario.resetForm();
      } else if (response === 'user') {
        this.presentToast('Succesful login', 'success');
        this.guardarCurrentUser(this.user, false);
        this.bubbles = false;
        this.router.navigate(['/user/tabs/tab1']);
        formulario.resetForm();
      } else {
        this.presentToast(response, 'danger');
      }
    });
    this.bubbles = false;
  }
  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: toastColor,
    });
    toast.present();
  }
}
