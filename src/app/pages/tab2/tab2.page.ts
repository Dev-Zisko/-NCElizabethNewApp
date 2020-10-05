import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { EnvService } from './../../services/env.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  foods: any; // Variable to foods
  categories: any; // Variable to categories
  nickname: string; // Variable that indicates if the user is logged in
  category: string; // Variable to selected category
  language: string; // Variable to store the language of app
  storageUri = this.env.API_STORAGE;

  constructor(private apiService: ApiService, private storage: Storage,
  private toastCtrl: ToastController, private env: EnvService) { }

  ngOnInit() {
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
      this.category = '';
      this.getCategories();
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
      this.getCategories();
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  getCategories(){
    try{
      this.apiService.getCategories("Comidas").subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error loading foods. Please try again later");
          }
          else{
            this.categories = data['categories'];
          }
        },
        error => {
          this.showToast("Unexpected error loading foods. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("Unexpected error loading foods. Please try again later");
    }
  }

  getFoods(){
    try{
      if(this.category == ""){
        //
      }else{
        this.apiService.getFoods(this.category).subscribe(
          data => {
            if(data['respuesta'] == 'false'){
              this.showToast("Unexpected error loading foods. Please try again later");
            }
            else{
              this.foods = data['foods'];
            }
          },
          error => {
            this.showToast("Unexpected error loading foods. Please try again later");
          }
        );
      }    
    }
    catch (error){
      this.showToast("Unexpected error loading foods. Please try again later");
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
