import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

//page
import { User } from './../../models/user.model';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  
  public lastname: any;
  public firstname: any;
  public avatar: any;
  public dataFormation: any;
  public formation: any;
  public formationId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {
    this.platform.ready().then(() => {
      this.lastname = this.navParams.get('lastname');
      this.firstname = this.navParams.get('firstname');
      this.avatar = this.navParams.get('avatar');
      this.formationId = this.navParams.get('formation_id');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
