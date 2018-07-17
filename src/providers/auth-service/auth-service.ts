import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

const apiUrl: string = "http://skillstracking.motjo.io/api/";

@Injectable()
export class AuthServiceProvider {

  public token: any;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, public apiService: ApiServiceProvider) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return this.http.post<any>(apiUrl + 'login', credentials)
      .pipe(
        map(
          user => {
            console.log('authService login user', user);
            if (user && user.token) {
              return user;
            }
            return null;
      }));
  }
  
  logout(): any {
     return this.apiService.get('logout').then(data => {
        console.log('logout data', data);
        this.nativeStorage.remove('user');
        return null;
      }, err => {
        console.log(err);
      });
  }

  isLogged() {
    const me = this.nativeStorage.getItem('user')
      .then(
        data => console.log('is logged' ,data)
      );
    return (me) ? true : false;
  }

  getUserTypeId() {
    const me : any = this.nativeStorage.getItem('user')
      .then(
        data => console.log(data)
      );
    return me.user_type_id;
  }

}
