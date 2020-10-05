import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Reservation } from './../../services/api.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sdreservation',
  templateUrl: './sdreservation.page.html',
  styleUrls: ['./sdreservation.page.scss'],
})
export class SdreservationPage implements OnInit {

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
  }; // Variable to see reservation in the view

  nickname: string; // Variable that indicates if the user is logged in
  public reservations: Observable<Reservation[]>; // Variable to see reservations in the view
  language: string; // Variable to store the language of app

  constructor(private activatedRoute: ActivatedRoute, private storage: Storage,
    private apiService: ApiService, private toastCtrl: ToastController) { }

  ngOnInit() {
    try{
      this.storage.get('nickname').then((val) => {
        this.nickname = val;
      });
      this.storage.get('language').then((val) => {
        this.language = val;
      });
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        try{
          this.apiService.getDetailmsg(id).subscribe(
            data => {
              if(data['respuesta'] == 'false'){
                this.showToast("Unexpected error loading your reservation. Please try again later");
              }
              else{
                this.reservation.name = data['reservation'].name;
                this.reservation.number = data['reservation'].number;
                this.reservation.email = data['reservation'].email;
                this.reservation.people = data['reservation'].people;
                this.reservation.date = data['reservation'].date;
                this.reservation.hour = data['reservation'].hour;
                this.reservation.status = data['reservation'].status;
                this.reservation.comment = data['reservation'].comment;
              }
            },
            error => {
              this.showToast("Unexpected error loading your reservation. Please try again later");
            }
          );
        }
        catch (error){
          this.showToast("Unexpected error loading your reservation. Please try again later");
        }
      }
    }
    catch(e){
      this.showToast("Unexpected error loading your reservation. Please try again later"); // Validation in case of an unexpected error
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
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        try{
          this.apiService.getDetailmsg(id).subscribe(
            data => {
              if(data['respuesta'] == 'false'){
                this.showToast("Unexpected error loading your reservation. Please try again later");
              }
              else{
                this.reservation.name = data['reservation'].name;
                this.reservation.number = data['reservation'].number;
                this.reservation.email = data['reservation'].email;
                this.reservation.people = data['reservation'].people;
                this.reservation.date = data['reservation'].date;
                this.reservation.hour = data['reservation'].hour;
                this.reservation.status = data['reservation'].status;
                this.reservation.comment = data['reservation'].comment;
              }
            },
            error => {
              this.showToast("Unexpected error loading your reservation. Please try again later");
            }
          );
        }
        catch (error){
          this.showToast("Unexpected error loading your reservation. Please try again later");
        }
      }
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

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
