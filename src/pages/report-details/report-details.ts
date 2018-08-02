import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Models
import { Student } from './../../models/student.model';
import { Report } from './../../models/report.model';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

/**
 * Generated class for the ReportDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  public report: Report;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider) {

    this.platform.ready().then(() => {

      this.setReport(this.navParams.get('report'), this.navParams.get('formation'));

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetailsPage');
  }

  private setReport(reportId: any, formationId: any): void {

    this.apiService.get('getReport/' + reportId + '/ofFormation/' + formationId)
    .then((data: any) => {

      console.log('data_report: ', data[0]);

      this.report = new Report(data[0].report_id, data[0].report_date, new Student(data[0].student_id, data[0].author[0].lastname, data[0].author[0].firstname), data[0].text);

      console.log('report: ', this.report);

    });

  }

}
