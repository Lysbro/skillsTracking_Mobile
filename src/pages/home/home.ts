import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, App, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;

  constructor(public navParams: NavParams, public platform: Platform, public navCtrl: NavController, public authService: AuthServiceProvider, public app: App, public apiService: ApiServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.platform.ready().then(() => {
      console.log('homeTs');
      this.apiService.get('users').then((data) => {
        console.log(data);
      });
    });
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
