import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DynamoDBService } from '../../services/dynamo-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private toastController: ToastController, private db: DynamoDBService,private router: Router) { }
  ngOnInit() {
  }

  onSubmit( formulario: NgForm) {
    if(this.db.getUser){
      formulario.resetForm();
      this.presentToast('Succesful login');
      this.router.navigate(['/user/tabs/tab1']);
    }
  }
  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }
}
