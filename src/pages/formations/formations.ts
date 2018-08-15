import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Pages
import { DashboardPage } from './../dashboard/dashboard';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

// Models
import { ProgressionTotal } from './../../models/progression-total.model';
import { Formation } from './../../models/formation.model';
import { Student } from './../../models/student.model';
import { Module } from '../../models/module.model';

// Env
import { Environment } from './../../environment/environment';

/**
 * Generated class for the FormationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-formations',
  templateUrl: 'formations.html',
})
export class FormationsPage {

  public formations: Formation[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider) {

    this.platform.ready().then(() => {

      this.setFormationsList();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormationsPage');
  }

  private setFormationsList(): void {

    this.apiService.get(Environment._TEACHER_URL.formationsUrl)
    .then((data: any) => {

      this.formations = [];

      console.log('formations_data: ', data['data']);

      for (let i = 0; i < data['data'].length; i++) {

        this.formations.push(new Formation(data['data'][i].id, data['data'][i].name, data['data'][i].logo, data['data'][i].start_at, data['data'][i].end_at));

        for (let j = 0; j < data['data'][i].modules.length; j++) {

          this.formations[i].addModule(new Module(data['data'][i].modules[j].id, data['data'][i].modules[j].name));
          
        }

      }

      console.log('formations: ', this.formations);

    })
    .then(() => {

      this.setStudentsListByFormation();

    });

  }

  private setStudentsListByFormation(): void {

    for (let i = 0; i < this.formations.length; i++) {

      this.apiService.get(Environment._TEACHER_URL.studentsByFormation + this.formations[i].id)
      .then((data: any) => {

        console.log('students_data: ', data);

        for (let j = 0; j < data.length; j++) {

          this.formations[i].addStudent(new Student(data[j].id, data[j].lastname, data[j].firstname, data[j].avatar, data[j].email, data[j].gender), new ProgressionTotal(data[j].progression.totalSkills, data[j].progression.studentValidations, data[j].progression.teacherValidations));

        }

        console.log('students: ', this.formations);

      });

    }

  }

  public showDashboard(formationId: any, studentId: any): void {

    this.navCtrl.push(DashboardPage, { formation: formationId, student: studentId });

  }

}
