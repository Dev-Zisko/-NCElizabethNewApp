import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'urlapi';
  API_STORAGE = 'urlstorage';
  constructor() { }
}
