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
  public users: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {
    this.platform.ready().then(() => {

      this.getUser();

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  private getUser() {
    this.apiService.get('users')
    .then((data: any) => {
      console.log('profil: ', data);
      
      this.users.push(new User(data.id, data.lastname, data.firstname, data.email));

      console.log('profil_user:', this.users);
    })
  }

}
