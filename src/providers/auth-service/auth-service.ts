import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

const apiUrl: string = "http://skillstracking.motjo.io/api/";

@Injectable()
export class AuthServiceProvider {

  public token: any;
  options: { headers: Headers; };

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
    const me = this.nativeStorage.getItem('user');
    console.log('islogged: ', me);
    return (me) ? true : false;
  }

  getUserTypeId() {
    return this.nativeStorage.getItem('user')
      .then(data => {
        console.log('user_type', data);
        return data.user_type_id;
      });
  }

}
