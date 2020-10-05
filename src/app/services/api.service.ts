import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Storage } from '@ionic/storage';

export interface User {
  id: string,
  name: string,
  lastname: string,
  cellphone: string,
  email: string,
  password: string,
  repeatpassword: string
}; // Object User

export interface Event {
  id: string,
  title: string,
  kind: string,
  day: string,
  date: string,
  hour: string,
  description: string,
  image: string,
  id_category: string
}; // Object Event

export interface Category {
  id: string,
  name: string,
  kind: string
}; // Object Category

export interface Food {
  id: string,
  title: string,
  kind: string,
  description: string,
  price: string,
  companion: string,
  image: string,
  id_category: string
}; // Object Food

export interface Special {
  id: string,
  title: string,
  kind: string,
  day: string,
  date: string,
  hour: string,
  description: string,
  extra: string,
  price: string,
  image: string,
  id_category: string
}; // Object Special

export interface Reservation {
  id: string,
  name: string,
  number: string,
  email: string,
  people: string,
  date: string,
  hour: string,
  status: string,
  comment: string
}; // Object Reservation
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CODE_PASS = '***************';

  selected = '';

  constructor(private http: HttpClient, private env: EnvService, private storage: Storage) { 
    this.storage.set('language', 'es');
  }

  //API REGISTER-LOGIN-SEARCHUSER-PROFILE-RECOVER

  register(name, lastname, cellphone, email, password) {
    try {
      return this.http.post(this.env.API_URL + 'apiregister',
        { name: name, lastname: lastname, cellphone: cellphone, 
          email: email, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  login(email, password) {
    try {
      return this.http.post(this.env.API_URL + 'apilogin',
        { email: email, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    } 
  }

  searchUser(email){
    try {
      return this.http.post(this.env.API_URL + 'apisearch',
        { email: email, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  editProfile(email, name, lastname, cellphone, password) {
    try {
      return this.http.post(this.env.API_URL + 'apiprofile',
        { email: email, name: name, lastname: lastname, cellphone: cellphone, 
          password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  sendCode(email) {
    try {
      return this.http.post(this.env.API_URL + 'apirecover',
        { email: email, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  // API RESERVATION-EMAIL

  makeReservation(name, cellphone, email, comment, date, hour, people) {
    try {
      return this.http.post(this.env.API_URL + 'apireservation',
        { name: name, cellphone: cellphone, email: email, comment: comment, 
          date: date, hour: hour, people: people, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  searchMessage(email){
    try {
      return this.http.post(this.env.API_URL + 'apimessage',
        { email: email, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  getDetailmsg(id){
    try {
      return this.http.post(this.env.API_URL + 'apidetailmsg',
        { id: id, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  // API CATEGORIES-FOODS-SPECIALS-EVENTS

  getCategories(kind){
    try {
      return this.http.post(this.env.API_URL + 'apicategories',
        { kind: kind, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  getFoods(category){
    try {
      return this.http.post(this.env.API_URL + 'apifoods',
        { category: category, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  getSpecials(category){
    try {
      return this.http.post(this.env.API_URL + 'apispecials',
        { category: category, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }

  getEvents(category){
    try {
      return this.http.post(this.env.API_URL + 'apievents',
        { category: category, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Operation failed. It may be due to connection problems, try later");
    }
  }
  
}
