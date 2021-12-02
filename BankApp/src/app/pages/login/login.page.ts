import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;
  constructor(private toastController: ToastController, private db: DynamoDBService, private router: Router) {
  }
  ngOnInit() {
    this.db.currentUser = '';
    this.db.isAdmin = false;
  }

  onSubmit( formulario: NgForm) {
    this.db.getUser(this.user, this.pass).then((response) => {
      if(response === 'admin'){
        formulario.resetForm();
        this.db.isAdmin = true;
        this.db.currentUser = this.user;
        this.presentToast('Succesful login', 'success');
        this.router.navigate(['/user/tabs/users']);
      }
      else if(response === 'user'){
        this.db.isAdmin = false;
        this.db.currentUser = this.user;
        this.presentToast('Succesful login', 'success');
        this.router.navigate(['/user/tabs/tab1']);
        formulario.resetForm();
      }
      else{
        this.presentToast(response, 'danger');
      }
    });
  }
  async presentToast(toastMessage: string, toastColor: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: toastColor
    });
    toast.present();
  }
}
