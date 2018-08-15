import { PlanningPage } from './../pages/planning/planning';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { DashboardPage } from '../pages/dashboard/dashboard';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ReportsPage } from './../pages/reports/reports';

// Providers 
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { ProfilPage } from '../pages/profil/profil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authService: AuthServiceProvider, private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: DashboardPage, icon:'home' },
      { title: 'Rapports', component: ReportsPage, icon:'document' },
      { title: 'Planning', component: PlanningPage, icon:'calendar'},
      { title: 'Profil', component: ProfilPage, icon:'person'},
      //{ title: 'Login', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {

    this.authService.logout()
    .then(() => {

      this.nav.setRoot(LoginPage);

    });

  }

}
