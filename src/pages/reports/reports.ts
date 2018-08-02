import { ReportDetailsPage } from './../report-details/report-details';
import { Formation } from './../../models/formation.model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Models
import { Student } from './../../models/student.model';
import { Report } from './../../models/report.model';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  public reports: Report[] = [];
  public formations: Formation[] = [];
  public reportDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider, private platform: Platform) {

    this.platform.ready().then(() => {

      this.getReportsListByStudent();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  private getReportsListByStudent() {
      this.apiService.get('report/getStudentsReportByFormation')
      .then((data: any) => {
        
        console.log('reports_data: ', data['data']);

        let reportData = data['data'];

        for (let i = 0; i < reportData.length; i++) {

          this.reports.push(new Report(reportData[i].report_id, reportData[i].created_date, reportData[i].last_edit_date, reportData[i].text,
            new Student(reportData[i].student_id, reportData[i].studentFirstname, reportData[i].studentLastname)));

        }
        
        console.log('reports: ', this.reports);

      });
  }

  public showDetails(reportId: any, reportFirstname: any, reportText: any, reportDateCreate: any, reportDateModified: any): void {

    this.navCtrl.push(ReportDetailsPage, {id:reportId, text:reportText, firstname:reportFirstname, date_created:reportDateCreate, date_modified:reportDateModified });

  }
}
