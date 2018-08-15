import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Pages
import { ReportDetailsPage } from './../report-details/report-details';

// Models
import { Student } from './../../models/student.model';
import { Report } from './../../models/report.model';
import { Formation } from './../../models/formation.model';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

// Env
import { Environment } from './../../environment/environment';

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

  public user: any;
  public formations: Formation[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider, private platform: Platform, private authService: AuthServiceProvider) {
    
    this.platform.ready().then(() => {

      this.authService.getAuth()
      .then((user: any) => {

        this.user = user;
        let url: any;

        switch (this.user.user_type_id) {

          case 2:
            url = Environment._TEACHER_URL.formationsUrl;
            this.setFormationsList(url);
            break;
          case 3:
            url = Environment._STUDENT_URL.reportsByFormation;
            this.setReportsListByFormation(url);
            default:
              console.log('type utilisateur non-reconnu');

        }

      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  private setFormationsList(url: any): void {

    this.apiService.get(url)
    .then((data: any) => {

      this.formations = [];

      console.log('formations_data: ', data['data']);

      for (let i = 0; i < data['data'].length; i++) {

        this.formations.push(new Formation(data['data'][i].id, data['data'][i].name, data['data'][i].logo, data['data'][i].start_at, data['data'][i].end_at, data['data'][i].total_students));

      }

      console.log('formations: ', this.formations);

    })
    .then(() => {

      let url: any = Environment._TEACHER_URL.reportsByFormation;

      this.setReportsListByFormation(url);

    });

  }

  private setReportsListByFormation(url: any): void {

    switch (this.user.user_type_id) {

      case 2:
        for (let i = 0; i < this.formations.length; i++) {

          this.apiService.get(url + this.formations[i].id)
          .then((data: any) => {
    
            console.log('reports_data: ', data);
    
            for (let j = 0; j < data.length; j++) {
    
              this.formations[i].addReport(new Report(data[j].report_id, data[j].report_date, new Student(data[j].student_id, data[j].student[0].lastname, data[j].student[0].firstname),  '', data[j].report_rate, data[j].report_is_daily, data[j].created_at, data[j].updated_at));
    
            }
    
          });
    
        } 
        break;
      case 3:
        this.apiService.get(url)
        .then((data: any) => {

          console.log('reports_data: ', data);
          this.formations[0] = new Formation(data['data'][0].formation_id, data['data'][0].name);

          for (let i = 0; i < data['data'].length; i++) {

            this.formations[0].addReport(new Report(data['data'][i].report_id, data['data'][i].report_date, new Student(data['data'][i].student_id, data['data'][i].studentLastname, data['data'][i].studentLastname), data['data'][i].text, data['data'][i].report_rate, data['data'][i].is_daily, data['data'][i].created_date, data['data'][i].last_edit_date));

          }

        });
        break;
      default:
        console.log('type utilisateur non-reconnu');

    }    

    console.log('reports: ', this.formations);
    
  }

  public showReport(reportId: any, formationId: any): void {

    this.navCtrl.push(ReportDetailsPage, { formation: formationId, report: reportId });
    
  }

}
