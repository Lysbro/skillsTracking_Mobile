import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  loginData = { email: '', password: '' };
  data: any;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private nativeStorage: NativeStorage, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem("user").then(
        (data) => {
          console.log('isLogged', data);
          this.navCtrl.setRoot(HomePage);
        },
        (err) => { console.log('erreur'); }
      );
    });
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).subscribe((result) => {
      this.loading.dismiss();
      this.data = result;
      this.nativeStorage.setItem('user', this.data).then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
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
