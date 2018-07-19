import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';


@Injectable()
export class ApiServiceProvider {

  apiUrl: string = "http://skillstracking.motjo.io/api/";
  options: any;

  constructor(public platform: Platform, public http: HttpClient, private nativeStorage: NativeStorage) {
    this.platform.ready().then(
      () => {
        this.setHeaders();
      }
    )
  }

  //====================== Configurer le header avec un token ======================
  setHeaders() {
    console.log('setHeader');
    return this.nativeStorage.getItem('user').then((data) => {
      let headers = new HttpHeaders({
        'Accept': "application/json",
        'Content-type': "application/json",
        'Authorization': "Bearer " + data.token
      });
      console.log('user', data);
      this.options = { headers: headers };
    });
  }

  //====================== Requête GET ======================
  get(url): any {
    return new Promise(resolve => {
      this.setHeaders().then(() => {
        console.log('get this.options', this.options);
        this.http.get(this.apiUrl + url, this.options).subscribe(data => {
          resolve(data);
          console.log('test');
        }, err => {
          console.log(err);
        });
      })
    });
  }

  //====================== Requête POST ======================
  post(url, data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + url, data, this.options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //====================== Requête PUT ======================
  public put(url, data) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + url, data, this.options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //====================== Requête PATCH ======================
  public patch(url, data) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + url, data, this.options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //====================== Requête DELETE ======================
  public delete(url, data) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + url, this.options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
