import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  constructor(
    private toastController: ToastController,
    private db: DynamoDBService,
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
  onSubmit(formulario: NgForm) {
    this.db.getUser(this.user, this.pass).then((response) => {
      if (response === 'admin') {
        this.presentToast('Succesful login', 'success');
        this.guardarCurrentUser(this.user, true);
        this.router.navigate(['/user/tabs/users']);
        formulario.resetForm();
      } else if (response === 'user') {
        this.presentToast('Succesful login', 'success');
        this.guardarCurrentUser(this.user, false);
        this.router.navigate(['/user/tabs/tab1']);
        formulario.resetForm();
      } else {
        this.presentToast(response, 'danger');
      }
    });
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
