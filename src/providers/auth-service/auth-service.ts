import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';

const apiUrl: string = "http://skillstracking.motjo.io/api/";

@Injectable()
export class AuthServiceProvider {

  public token: any;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return this.http.post<any>(apiUrl + 'login', credentials)
      .pipe(map(user => {
        console.log('authService login user', user);
        if (user && user.token) {
          this.nativeStorage.setItem('user', credentials)
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        }
        return user;
      }));
  }
  
  logout() {
    let httpOptions : any;
    this.nativeStorage.getItem('myitem')
    .then(data => {
      httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.token
      })}
  });
    return this.http.get(apiUrl + 'logout', httpOptions)
      .pipe(map(data => {
        console.log('logout data', data);
        this.nativeStorage.remove('user');
        return data;
      }));
  }

  isLogged() {
    // const me = JSON.parse(localStorage.getItem('user'));
    // console.log('isLogged', me);
    // return (me) ? true : false;

    const me = this.nativeStorage.getItem('user')
      .then(
        data => console.log('is logged' ,data)
      );
    return (me) ? true : false;
  }

  getUserTypeId() {
    const me = this.nativeStorage.getItem('user')
      .then(
        data => console.log(data)
      );
    return me;
  }

}
