import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';


@Injectable()
export class ApiServiceProvider {
  
  apiUrl: string = "http://skillstracking.motjo.io/api/";
  private options: any;


  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {    

  }

  //====================== Configurer le header avec un token ======================
  setHeaders() {

    return this.nativeStorage.getItem('user')
    .then(data => {
    
      console.log('user', data);

      this.options = {

        headers: new HttpHeaders({

          'Accept': 'application/json',
          'Authorization': 'Bearer ' + data.token,
          'Content-Type': 'application/json'

        })

      };
    
      console.log('options', this.options);

    });

  }

  //====================== Requête GET ======================
  get(url) {

    return new Promise(resolve => {

      this.setHeaders()                      
      .then(() => {

        this.http.get(this.apiUrl + url, this.options).subscribe(result => {

          console.log('result', result);

          resolve(result);

        }, err => {

          console.log(err);

        });

      });
      
    });

  }

  //====================== Requête POST ======================
  post(url, data) {

    return new Promise(resolve => {

      this.setHeaders()
      .then(() => {

        this.http.post(this.apiUrl + url, data, this.options).subscribe(result => {

          console.log('result', result);

          resolve(result);

        }, err => {

          console.log(err);

        });

      });
      
    });

  }

  //====================== Requête PUT ======================
  public put(url, data) {

    return new Promise(resolve => {

      console.log('put controle: ', data);

      this.setHeaders()
      .then(() => {

        this.http.put(this.apiUrl + url, data, this.options).subscribe(result => {

          resolve(result);

        }, err => {

          console.log(err);

        });

      });
      
    });

  }

  //====================== Requête PATCH ======================
  public patch(url, data) {

    return new Promise(resolve => {

      this.setHeaders()
      .then(() => {

        this.http.put(this.apiUrl + url, data, this.options).subscribe(result => {

          resolve(result);

        }, err => {

          console.log(err);

        });

      });
      
    });

  }

  //====================== Requête DELETE ======================
  public delete(url, data) {

    return new Promise(resolve => {

      this.setHeaders()
      .then(() => {

        this.http.delete(this.apiUrl + url, this.options).subscribe(result => {

          resolve(result);

        }, err => {

          console.log(err);

        });

      });      
      
    });

  }

}
