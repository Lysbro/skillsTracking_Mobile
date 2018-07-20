import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private student: any;
  students: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider) {

    this.platform.ready().then(() => {

      this.setStudent(this.navParams.data);
      this.students = this.navParams.get('students');
      console.log(this.students);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  private setStudent(id: any): void {

    this.apiService.get('student/' + id)
    .then((data) => {

      console.log('student_data: ', data);

    });
  }

}
