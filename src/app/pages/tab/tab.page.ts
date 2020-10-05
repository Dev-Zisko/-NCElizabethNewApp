import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { EnvService } from './../../services/env.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  specials: any; // Variable to specials
  specialsf: any; // Variable to specialsf
  categories: any; // Variable to categories
  nickname: string; // Variable that indicates if the user is logged in
  category: string; // Variable to selected category
  language: string; // Variable to store the language of app
  validate: string;
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
      this.showToast("Unexpected error loading specials. Please try again later"); // Validation in case of an unexpected error
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
      this.showToast("Unexpected error loading specials. Please try again later"); // Validation in case of an unexpected error
    }
  }

  getCategories(){
    try{
      this.apiService.getCategories("Especiales").subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error loading specials. Please try again later");
          }
          else{
            this.categories = data['categories'];
          }
        },
        error => {
          this.showToast("Unexpected error loading specials. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("Unexpected error loading specials. Please try again later");
    }
  }

  getSpecials(){
    try{
      if(this.category == ""){
        //
      }else{
        this.apiService.getSpecials(this.category).subscribe(
          data => {
            if(data['respuesta'] == 'false'){
              this.showToast("Unexpected error loading specials. Please try again later");
            }
            else{
              this.specials = data['specials'];
              this.specialsf = data['specialsf'];
              this.validate = "Si";
            }
          },
          error => {
            this.showToast("Unexpected error loading specials. Please try again later");
          }
        );
      }
    }
    catch (error){
      this.showToast("Unexpected error loading specials. Please try again later");
    }
  }

  cleanCategory(){
    this.validate = "No";
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
