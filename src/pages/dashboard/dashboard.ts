import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Formation } from './../../models/formation.model';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Form } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  modules: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider, private authUserType: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    this.getAllModule();
    console.log('connection réussi !');
  }

  getAllModule() {
    this.apiService.get('modules')
    .then(data => {
      this.modules = data;
      console.log(this.modules);
    });
  }

}
