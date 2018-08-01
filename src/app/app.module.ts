import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FormationsPage } from '../pages/formations/formations';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ReportsPage } from '../pages/reports/reports';
import { ReportDetailsPage } from '../pages/report-details/report-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Native component
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../providers/api-service/api-service';

class NativeStorageMock extends NativeStorage {
  getData(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}
@NgModule({
  declarations: [
    ReportDetailsPage,
    ReportsPage,
    DashboardPage,
    FormationsPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ReportDetailsPage,
    ReportsPage,
    DashboardPage,
    FormationsPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: NativeStorage, useClass: NativeStorageMock },
    AuthServiceProvider,
    ApiServiceProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
