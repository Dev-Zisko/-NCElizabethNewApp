import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService} from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  nickname: string; // Variable that indicates if the user is logged in
  language: string; // Variable to store the language of app
  reservations: any; // Variable to reservations

  constructor(private apiService: ApiService, private storage: Storage,
  private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
        if(this.nickname == "" && this.nickname == null){
          this.router.navigateByUrl('/menu/third');
          this.showToast('First you must log in');
        }
        else{
          this.searchMessage();
        }
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
        if(this.nickname == "" && this.nickname == null){
          this.router.navigateByUrl('/menu/third');
          this.showToast('First you must log in');
        }
        else{
          this.searchMessage();
        }
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  searchMessage(){
    try{
      this.apiService.searchMessage(this.nickname).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error loading your reservations. Please try again later");
          }
          else{
            this.reservations = data['reservations'];
          }
        },
        error => {
          this.showToast("Unexpected error loading your reservations. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("Unexpected error loading your reservations. Please try again later");
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
