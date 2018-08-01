import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Models
import { Student } from './../../models/student.model';
import { Report } from './../../models/report.model';
import { Formation } from './../../models/formation.model';

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

  public formations: Formation[] = [];
  public reports: Report[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider, private platform: Platform) {
    
    this.platform.ready().then(() => {

      //this.setFormationsList();
      this.getReportsListByStudent();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  private setFormationsList(): void {

    this.apiService.get('teacher/myFormations')
    .then((data: any) => {

      this.formations = [];

      console.log('formations_data: ', data['data']);

      for (let i = 0; i < data['data'].length; i++) {

        this.formations.push(new Formation(data['data'][i].id, data['data'][i].name));

      }

      console.log('formations: ', this.formations);

    })
    .then(() => {

      this.setReportsListByFormation();

    });

  }

  private setReportsListByFormation() {

    for (let i = 0; i < this.formations.length; i++) {

      this.apiService.get('reportsByFormation/' + this.formations[i].id)
      .then((data: any) => {

        console.log('reports_data: ', data);

        for (let j = 0; j < data.length; j++) {

          this.formations[i].addReport(new Report(data[j].report_id, data[j].report_date, new Student(data[j].student_id, data[j].student.lastname, data[j].student.firstname)));

        }

      });

    }    

    console.log('reports: ', this.formations);
    
  }

  private getReportsListByStudent() {

    for (let i = 0; i < this.reports.length; i++) {

      this.apiService.get('report/getStudentsReportByFormation')
      .then((data: any) => {

        console.log('reports_data: ', data);

        for (let j = 0; j < data.length; j++) {

          this.reports[i].getAutor();

        }

      });

    }    

    console.log('reports: ', this.reports);
    
  }

}
