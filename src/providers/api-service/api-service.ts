import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';


@Injectable()
export class ApiServiceProvider {
  
  apiUrl: string = "http://skillstracking.motjo.io/api/";
  options: any;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    this.setHeaders();
  }

  //====================== Configurer le header avec un token ======================
  setHeaders() {
    this.nativeStorage.getItem('user').then((data) => { // data undefine, le storage est vide
      console.log('setHeader', data);
      let headers = new Headers();
      headers.append('Authorization', "Bearer " + data.token);
      this.options = { headers: headers };
    });
  }

  //====================== Requête GET ======================
  get(url) {
    console.log(this.options);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + url, this.options).subscribe(data => {
        resolve(data);
        console.log('test');
      }, err => {
        console.log(err);
      });
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
