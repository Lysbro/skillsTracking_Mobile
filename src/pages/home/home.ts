import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, public authService: AuthServiceProvider, public app: App, public apiService: ApiServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.apiService.get('formations').then((data) => {
      console.log(data);
    });
  }

  logout() {
    // this.authService.logout().then((result) => {
    //   this.loading.dismiss();
    //   let nav = this.app.getRootNav();
    //   nav.setRoot(LoginPage);
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.presentToast(err);
    // });

    this.authService.logout();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
