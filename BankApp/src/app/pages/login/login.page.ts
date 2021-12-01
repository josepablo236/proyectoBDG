import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;
  
  constructor(private toastController: ToastController, private db: DynamoDBService, private router: Router) { }
  ngOnInit() {
  }

  onSubmit( formulario: NgForm) {
    this.db.getUser(this.user, this.pass).then((response) => {
      if(response === "admin"){
        console.log(response);
        formulario.resetForm();
        this.presentToast('Succesful login', 'success');
        this.router.navigate(['/user/tabs/users']);
      }
      else if(response === "user"){
        formulario.resetForm();
        this.presentToast('Succesful login', 'success');
        this.router.navigate(['/user/tabs/tab1']);
      }
      else{
        this.presentToast(response, 'danger');
      }
    });
  }
  async presentToast(toastMessage: string, color: string) {
    const toast = await this.toastController.create({
      cssClass: 'center',
      message: toastMessage,
      duration: 1000,
      color: color
    });
    toast.present();
  }
}
