import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Reservation, User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  reservation: Reservation = {
    id: '',
    name: '',
    number: '',
    email: '',
    people: '',
    date: '',
    hour: '',
    status: '',
    comment: ''
  }; // Variable to save the reservation

  user: User = {
    id: '',
    name: '',
    lastname: '',
    cellphone: '',
    email: '',
    password: '',
    repeatpassword: ''
  }; // Variable to save the user
  
  date: any = new Date().toISOString(); // Variable that stores the date of the event
  hour: any = new Date().toISOString(); // Variable that stores the hour of the event
  convert: string[]; // Variable that will be used to convert the selected date to the correct format
  convert3: string; // Variable that will be used to convert the selected date to the correct format
  convert4: string[]; // Variable that will be used to convert the selected date to the correct format
  convert1: string[]; // Variable that will be used to convert the selected hour to the correct format
  convert2: string; // Variable that will be used to convert the selected hour to the correct format
  today = Date.now(); // Variable that obtain date of today
  subject: string; // Variable to save the subject of email
  isLogged: string; // Variable to know if user is logged
  emailAuth: string; // Variable to save the email of user 
  name: string; // Variable to save the name of user
  number: string; // Variable to save the number of user
  nickname: string; // Variable that indicates if the user is logged in
  language: string; // Variable to store the language of app
  todayValidate = new Date();
  dd = String(this.todayValidate.getDate()).padStart(2, '0');
  mm = String(this.todayValidate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.todayValidate.getFullYear();
  hh = this.todayValidate.getHours();
  chao: number;
  todayVal: string;
  diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  f = new Date();

  constructor(private apiService: ApiService, private storage: Storage,
  private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
        if(this.nickname != "" && this.nickname != null){
          this.searchUser();
        }
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
      this.date = "";
      this.hour = "";
      this.todayVal = this.mm + '/' + this.dd + '/' + this.yyyy;
      this.chao = this.todayValidate.getUTCDay();
      console.log(this.todayVal + " " + this.chao + " " + this.diasSemana[this.f.getDay()]);
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  ionViewWillEnter() {
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
        if(this.nickname != "" && this.nickname != null){
          this.searchUser();
        }
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
      this.date = "";
      this.hour = "";
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  addReservation() { // In this method use to save that reservation in firestore
    try{
      if(this.nickname != "" && this.nickname != null){
        this.reservation.email = this.user.email;
        this.reservation.name = this.user.name + " " + this.user.lastname;
        this.reservation.number = this.user.cellphone;
      }
      if(this.reservation.name == '' || this.reservation.number == '' || this.reservation.email == '' 
        || this.reservation.people == '' || this.date == '' || this.hour == ''
        || this.reservation.comment == ''){
          this.showToast('Please fill all fields');
      }
      else if(this.reservation.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('This is not a valid email');
      }
      else{
        let d = new Date(this.date);
        this.convert = this.date.split("-");
        this.convert3 = this.convert[2];
        this.convert4 = this.convert3.split("T");
        this.reservation.date = this.convert[1] + "/" + this.convert4[0] + "/" + this.convert[0];
        this.convert1 = this.hour.split("T");
        this.convert2 = this.convert1[1];
        this.convert1 = this.convert2.split(":");
        this.reservation.hour = this.convert1[0] + ":" + this.convert1[1];
        if(this.reservation.date <= this.todayVal){
          this.showToast('Reservations are only allowed 24 hours in advance');   
        }
        else if(this.convert[1] == this.mm && Number(this.convert4[0]) == Number(Number(this.dd) + 1)){
          if(Number(this.convert1[0]) <= this.hh){
            this.showToast('Reservations are only allowed 24 hours in advance');
          }
          else{
            if(String(this.diasSemana[d.getDay()]) == "Sábado"){
              if(Number(this.convert1[0]) >= 18 && Number(this.convert1[0]) <= 21){
                this.showToast('You cannot reserve Saturdays between 6 pm and 9 pm');
              }
              else{
                this.apiService.makeReservation(this.reservation.name, this.reservation.number, this.reservation.email,
                  this.reservation.comment, this.reservation.date, this.reservation.hour, this.reservation.people).subscribe(
                  data => {
                    if(data['respuesta'] == 'true'){
                      this.router.navigateByUrl('/menu/first');
                      this.showToast('Your reservation was created successfully. Wait for our prompt response');
                    }
                    else{
                      this.showToast("Unexpected error creating your reservation. Please try again later");
                    }
                  },
                  error => {
                    this.showToast("Unexpected error creating your reservation. Please try again later");
                  }
                );
              }
            }
            else{
              this.apiService.makeReservation(this.reservation.name, this.reservation.number, this.reservation.email,
                this.reservation.comment, this.reservation.date, this.reservation.hour, this.reservation.people).subscribe(
                data => {
                  if(data['respuesta'] == 'true'){
                    this.router.navigateByUrl('/menu/first');
                    this.showToast('Your reservation was created successfully. Wait for our prompt response');
                  }
                  else{
                    this.showToast("Unexpected error creating your reservation. Please try again later");
                  }
                },
                error => {
                  this.showToast("Unexpected error creating your reservation. Please try again later");
                }
              );
            }           
          }
        }
        else{
          if(String(this.diasSemana[d.getDay()]) == "Sábado"){
            if(Number(this.convert1[0]) >= 18 && Number(this.convert1[0]) <= 21){
              this.showToast('You cannot reserve Saturdays between 6 pm and 9 pm');
            }
            else{
              this.apiService.makeReservation(this.reservation.name, this.reservation.number, this.reservation.email,
                this.reservation.comment, this.reservation.date, this.reservation.hour, this.reservation.people).subscribe(
                data => {
                  if(data['respuesta'] == 'true'){
                    this.router.navigateByUrl('/menu/first');
                    this.showToast('Your reservation was created successfully. Wait for our prompt response');
                  }
                  else{
                    this.showToast("Unexpected error creating your reservation. Please try again later");
                  }
                },
                error => {
                  this.showToast("Unexpected error creating your reservation. Please try again later");
                }
              );
            }
          }
          else{
            this.apiService.makeReservation(this.reservation.name, this.reservation.number, this.reservation.email,
              this.reservation.comment, this.reservation.date, this.reservation.hour, this.reservation.people).subscribe(
              data => {
                if(data['respuesta'] == 'true'){
                  this.router.navigateByUrl('/menu/first');
                  this.showToast('Your reservation was created successfully. Wait for our prompt response');
                }
                else{
                  this.showToast("Unexpected error creating your reservation. Please try again later");
                }
              },
              error => {
                this.showToast("Unexpected error creating your reservation. Please try again later");
              }
            );
          }           
        }
      }
    }
    catch(e){
      this.showToast("Unexpected error creating your reservation. Please try again later"); // Validation in case of an unexpected error
    }
  }

  searchUser(){
    try{
      this.apiService.searchUser(this.nickname).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Unexpected error creating your reservation. Please try again later");
          }
          else{
            this.user.name = data['customer'].name;
            this.user.lastname = data['customer'].lastname;
            this.user.cellphone = data['customer'].cellphone;
            this.user.email = data['customer'].email;
          }
        },
        error => {
          this.showToast("Unexpected error creating your reservation. Please try again later");
        }
      );
    }
    catch (error){
      this.showToast("Unexpected error creating your reservation. Please try again later");
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