import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nickname: string; // Variable that indicates if the user is logged in
  language: string; // Variable to store the language of app

  constructor(private storage: Storage) { }

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

  statusLogLang(){
    this.storage.get('nickname').then((val) => {
      this.nickname = val;
    });
    this.storage.get('language').then((val) => {
      this.language = val;
    });
  }

}
