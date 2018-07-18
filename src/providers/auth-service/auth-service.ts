import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';

const apiUrl: string = "http://skillstracking.motjo.io/api/";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return this.http.post<any>(apiUrl + 'login', credentials)
      .pipe(map(user => {
        console.log('authService login user', user);
        if (user && user.token) {
          this.nativeStorage.setItem('user', user)
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        }
        return user;
      }));
  }
  
  logout() {

    return this.nativeStorage.getItem('user')
    .then(data => {

      let httpOptions: any = {

        headers: new HttpHeaders({

          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + data.token

        })

      };

      return this.http.get(apiUrl + 'logout', httpOptions)
      .toPromise()
      .then(data => {

        console.log('logout data', data);
        this.nativeStorage.remove('user');
        
        return data;

      });

    });

  }

  isLogged() {

    return (this.nativeStorage.getItem('user')) ? true : false;

  }

  getUserTypeId() {

    return this.nativeStorage.getItem('user')
    .then(data => {

      console.log('user_type', data);

      return data.user_type_id;

    });

  }

}
