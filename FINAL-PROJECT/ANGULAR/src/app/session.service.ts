import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  LoggedInUserDetails = new EventEmitter<any>(); 

  setValueToSession(key: string, value: any) {
    if (sessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      alert('Your current browser doesnot support Session');
    }
  }

  getValueFromSession(key: string) {
    if (sessionStorage.getItem(key) !== '') {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      alert('Session Could not be verified. Login Again');
    }
  }

  removeSessionItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSession() {
    sessionStorage.clear();
}

}
