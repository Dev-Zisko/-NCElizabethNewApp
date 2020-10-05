import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
        if(this.nickname == "" && this.nickname == null){
          this.router.navigateByUrl('/menu/third');
          this.showToast('First you must log in');
        }
        else{
          this.searchUser();
        }
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
    }
  
    ionViewWillEnter() {
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
        if(this.nickname == "" && this.nickname == null){
          this.router.navigateByUrl('/menu/third');
          this.showToast('First you must log in');
        }
        else{
          this.searchUser();
        }
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
    }

    searchUser(){
      try{
        this.apiService.searchUser(this.nickname).subscribe(
          data => {
            if(data['respuesta'] == 'false'){
              this.showToast("Unexpected error seeing your profile. Please try again later");
            }
            else{
              this.user.name = data['customer'].name;
              this.user.lastname = data['customer'].lastname;
              this.user.cellphone = data['customer'].cellphone;
              this.user.email = data['customer'].email;
            }
          },
          error => {
            this.showToast("Unexpected error seeing your profile. Please try again later");
          }
        );
      }
      catch (error){
        this.showToast("Unexpected error seeing your profile. Please try again later");
      }
    }
  
    editProfile(){
      try{
        if(this.user.name == "" || this.user.lastname == "" || this.user.cellphone == ""){
          this.showToast('Please fill all the boxes');
        }
        else{
          if(this.user.password == "" && this.user.repeatpassword == ""){
            this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone
              ,'').subscribe(
              data => {
                if(data['respuesta'] == 'true'){
                  this.router.navigateByUrl('/menu/first');
                  this.showToast('Your profile was updated correctly');
                }
                else{
                  this.showToast("Unexpected error editing profile. Please try later");
                }
              },
              error => {
                this.showToast("Unexpected error editing profile. Please try later");
              }
            );
          }
          else if(this.user.password != "" || this.user.repeatpassword != ""){
            if(this.user.password != this.user.repeatpassword){
              this.showToast('Both passwords must match');
            }
            else if(this.user.password.length < 8){
              this.showToast('Password must contain at least 8 characters');
            }
            else{
              this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone, 
                this.user.password).subscribe(
                data => {
                  if(data['respuesta'] == 'true'){
                    this.router.navigateByUrl('/menu/first');
                    this.showToast('Your profile was updated correctly');
                  }
                  else{
                    this.showToast("Unexpected error editing profile. Please try later");
                  }
                },
                error => {
                  this.showToast("Unexpected error editing profile. Please try later");
                }
              );
            }
          }     
        }
      }
      catch (error){
        this.showToast("Unexpected error seeing your profile. Please try again later");
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
