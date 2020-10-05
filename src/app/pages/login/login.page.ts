import { Component, OnInit } from '@angular/core';
import { ApiService, User } from './../../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  login(){
    try {
      if(this.user.email == "" || this.user.password == "") {
        this.showToast('Please fill all the boxes');
      }
      else if(this.user.password.length < 8){
        this.showToast('The password must contain at least 8 characters');
      }
      else{
        this.apiService.login(this.user.email, this.user.password).subscribe(
          data => {
            if(data['respuesta'] == "true"){
              this.storage.set('nickname', this.user.email);
              this.router.navigateByUrl('/menu/first');
              this.showToast('Welcome!');
            }
            else if(data['respuesta'] == "false") {
              this.showToast('Error in logging in. Verify the data and try again');
            }
          },
          error => {
            this.showToast("Unexpected error logging in. Please try later");
          }
        );
      }
    }
    catch (error){
      this.showToast("Unexpected error logging in. Please try later");
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
