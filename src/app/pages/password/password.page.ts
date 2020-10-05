import { Component, OnInit } from '@angular/core';
import { ApiService, User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  user: User = {
    id: '',
    name: '',
    lastname: '',
    cellphone: '',
    email: '',
    password: '',
    repeatpassword: ''
  }; // Variable to save the user

  nickname: string; // Variable that indicates if the user is logged in
  language: string; // Variable to store the language of app

  constructor(private apiService: ApiService, private storage: Storage,
    private toastCtrl: ToastController, private router: Router) { }

    ngOnInit() {
      try{
        this.storage.get('nickname').then((val) => {
          this.nickname = val;
        });
        this.storage.get('language').then((val) => {
          this.language = val;
        });
      }
      catch(e){
        alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
      }
    }

    sendCode(){
      this.apiService.sendCode(this.user.email).subscribe(
        data => {
          if(data['respuesta'] == 'true'){
            this.router.navigateByUrl('/menu/first');
            this.showToast('Your code was send. Check your email please and follow the steps');
          }
          else{
            this.showToast("Unexpected error sending recovery mail. Please try later");
          }
        },
        error => {
          this.showToast("Unexpected error sending recovery mail. Please try later");
        }
      );
    }
  
    ionViewWillEnter() {
      try{
        this.storage.get('nickname').then((val) => {
          this.nickname = val;
        });
        this.storage.get('language').then((val) => {
          this.language = val;
        });
      }
      catch(e){
        alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
      }
    }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  statusLogLang(){
    this.storage.get('nickname').then((val) => {
      this.nickname = val;
    });
    this.storage.get('language').then((val) => {
      this.language = val;
    });
  }
  
}
