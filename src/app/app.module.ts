import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { MyApp } from './app.component';
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


@NgModule({
  declarations: [
    ReportDetailsPage,
    ReportsPage,
    DashboardPage,
    FormationsPage,
    MyApp,
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider
  ]
})
export class AppModule {}
