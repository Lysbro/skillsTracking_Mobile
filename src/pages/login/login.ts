import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';

// Providers
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

// Pages
import { FormationsPage } from './../formations/formations';
import { DashboardPage } from './../dashboard/dashboard';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  loginData = { email: '', password: '' };
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public menuCtrl: MenuController) {

  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).subscribe((data: any) => {
      this.loading.dismiss();

      console.log('login result', data);

      // on redirige l'utilisateur 
      this.setPage(data);

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

  private setPage(user: any): void {

    if (this.authService.isLogged()) {

      if (user.user_type_id == 3) { 
                    
        this.navCtrl.setRoot(DashboardPage, user);

      } else if (user.user_type_id == 2) {

        this.navCtrl.setRoot(FormationsPage);

      } else {

       // faire afficher un message ou attendre la réponse du client pour savoir quels sont les accès à gérer

      }

    }

  }

}
