import { PlanningPage } from './../pages/planning/planning';
import { ProfilPage } from './../pages/profil/profil';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';


@NgModule({
  declarations: [
    ReportDetailsPage,
    ReportsPage,
    DashboardPage,
    FormationsPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilPage,
    PlanningPage
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
    LoginPage,
    ProfilPage,
    PlanningPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider,
    File,
    DocumentViewer,
    FileTransfer
  ]
})
export class AppModule {}
