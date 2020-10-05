import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ApiService, User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = ''; // Variable indicating the selected route
  notify: any; // Variable to notify a change of language
  nickname: string; // Variable that indicates if the user is logged in
  language: string; // Variable to store the language of app
  selected = ''; // Variable indicating the selected in the view

  user: User = {
    id: '',
    name: '',
    lastname: '',
    cellphone: '',
    email: '',
    password: '',
    repeatpassword: ''
  }; // Variable to save the user

  pagesnotLogged = [
    {
      title: 'Home',
      url: '/menu/first'
    },
    {
      title: 'Registro',
      url: '/menu/second'
    },
    {
      title: 'Login',
      url: '/menu/third'
    },
  ]; // Variable that stores the menu pages
  
  pagesLogged = [
    {
      title: 'Home',
      url: '/menu/first'
    },
    {
      title: 'Mis mensajes',
      url: '/menu/fourth'
    },
    {
      title: 'Mi perfil',
      url: '/menu/profile'
    },
    {
      title: 'Salir',
      url: '/logout'
    }
  ]; // Variable that stores the menu pages
 
  constructor(private toastCtrl: ToastController, private storage: Storage,
    private router: Router, private apiService: ApiService) {
    this.router.events.subscribe((event: RouterEvent) => { // This method indicating the selected route
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() { // Some variables are set
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
      this.selected = this.apiService.selected;
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
 
  select(notify) { // This method indicates the language of aplication
    if(notify == true){
      this.storage.set('language', 'en');
      this.showToast('Language changed to English. If it was not updated, click on the screen.');
    } else if(notify == false){
      this.storage.set('language', 'es');
      this.showToast('Idioma cambiado a Español. Si no se actualizo, clickee en la pantalla.');
    }
    this.storage.get('language').then((val) => {
      this.language = val;
    });
  }

  logout(){
    try {
      this.storage.set('nickname', '');
      this.storage.set('nickname', '');
      this.storage.set('nickname', '');
      this.storage.set('language', 'es');
      this.storage.set('language', 'es');
      this.storage.set('language', 'es');
      this.router.navigateByUrl('/menu/first');
      this.showToast('See you soon!');
    }
    catch (error){
      this.showToast("Unexpected error logging out. Try again later");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 4000
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