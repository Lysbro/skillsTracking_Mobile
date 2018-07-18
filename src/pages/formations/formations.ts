import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ApiServiceProvider } from './../../providers/api-service/api-service';

/**
 * Generated class for the FormationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-formations',
  templateUrl: 'formations.html',
})
export class FormationsPage {

  public formations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {

    this.platform.ready().then(() => {

      this.setFormationsList();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormationsPage');
  }

  private setFormationsList() {

    this.apiService.get('formations').then((data) => {

      console.log('formations_data: ', data);

      this.formations = data;

      console.log('formations: ', this.formations);

    });
    
  }

}
