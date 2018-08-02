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

}
