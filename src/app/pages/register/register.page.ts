import { Component, OnInit } from '@angular/core';
import { ApiService, User } from './../../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
  
  register() { // In this method use to save that user in firestore
    try{
      if(this.user.name == '' || this.user.cellphone == '' || this.user.email == '' 
      || this.user.password == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.user.password != this.user.repeatpassword){
        this.showToast('Passwords do not match');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('This is not a valid email');
      }
      else if(this.user.password.length < 8){
        this.showToast('This is not a valid password, minimum 8 characters');
      }
      else{
        this.apiService.register(this.user.name, this.user.lastname, this.user.cellphone, 
          this.user.email, this.user.password).subscribe(
          data => {
            if(data["respuesta"] == "true"){
              this.router.navigateByUrl('/menu/third');
              this.showToast('User registered successfully');
            }
            else if(data["respuesta"] == "false"){
              this.showToast('Registration failed. This user already exists, verify the data and try again');
            }
          },
          error => {
            this.showToast("Unexpected error registering. Please try later");
          }
        );
      }
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
