import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

// Pages
import { FormationsPage } from './../formations/formations';
import { DashboardPage } from './../dashboard/dashboard';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).subscribe((result) => {
      this.loading.dismiss();

      // on redirige l'utilisateur 
      this.setPage(result);

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

  private setPage(user): void {

    console.log(this.authService.isLogged());

    console.log('user-connecte: ',user);
    if (this.authService.isLogged()) {

      this.authService.getUserTypeId().then(data => {
        
        if (data == 3) {

          this.navCtrl.setRoot(DashboardPage, user);
        } else if (data == 2) {

          this.navCtrl.setRoot(FormationsPage);

        } else {

          this.navCtrl.setRoot(HomePage); // Qu'est-ce qu'on fait là ???!!

        }

      });

    }

  }

}
