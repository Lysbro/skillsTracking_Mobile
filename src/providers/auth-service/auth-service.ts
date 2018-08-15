import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Plug-in installed
import { NativeStorage } from '@ionic-native/native-storage';

// Env
import { Environment } from './../../environment/environment';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {

    return this.http.post<any>(Environment._API_URL + 'login', credentials)
    .pipe(map(user => {

      if (user && user.token) {

        this.nativeStorage.setItem('user', user)
        .then(() => console.log('Stored item!', user),
          error => console.error('Error storing item', error)
        );
      
      }
        
      return user;
    
    }));

  }
  
  logout() {

    return this.nativeStorage.getItem('user')
    .then(user => {

      let httpOptions: any = {

        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + user.token })

      };

      return this.http.get(Environment._API_URL + 'logout', httpOptions)
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

  public getAuth(): Promise<any> {

    return this.nativeStorage.getItem('user')
    .then(user => {

      return user;

    });

  }

}
