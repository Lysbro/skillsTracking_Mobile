import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  public firstname: any;
  public text: any;
  public dateModifed: any;
  public dateCreated: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.platform.ready().then(() => {

      this.firstname = this.navParams.get('firstname');
      this.text = this.navParams.get('text');
      this.dateCreated = this.navParams.get('date_created');
      this.dateModifed = this.navParams.get('date_modified');

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
