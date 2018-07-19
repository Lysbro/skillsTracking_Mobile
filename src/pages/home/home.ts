import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public apiService: ApiServiceProvider) {

  }

}
