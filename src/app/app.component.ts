import { FormationsPage } from './../pages/formations/formations';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

// Providers 
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { NativeStorage } from '../../node_modules/@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authService: AuthServiceProvider, private nativeStorage: NativeStorage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Formations', component: FormationsPage },
      { title: 'Logout', component: null }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.nativeStorage.remove('user');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.Component) {
      this.nav.setRoot(page.component);
    } else {
      this.authService.logout().then(
        () => {
          this.nav.setRoot(LoginPage);
        }
      )
    }
  }

}
