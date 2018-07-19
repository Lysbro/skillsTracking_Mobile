import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Pages
import { DashboardPage } from './../dashboard/dashboard';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

// Models
import { Formation } from './../../models/formation.model';
import { Student } from './../../models/student.model';

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

    this.apiService.get('teacher/myFormations')
      .then((data: any) => {

        this.formations = [];
        let formation: Formation;

        console.log('formations_data: ', data['data']);

        for (let i = 0; i < data['data'].length; i++) {

          formation = new Formation();
          formation.id = data['data'][i].id;
          formation.name = data['data'][i].name;

          console.log('détail_formation: ', formation);

          this.formations.push(formation);

        }

        console.log('formations: ', this.formations);

      })
      .then(() => {

        this.setStudentsListByFormation();

      });

  }

  private setStudentsListByFormation(): void {

    for (let i = 0; i < this.formations.length; i++) {

      this.apiService.get('getStudentsOfFormation/' + this.formations[i].id)
        .then((data: any) => {

          console.log('students_data: ', data);

          let student: Student;

          for (let j = 0; j < data.length; j++) {

          student = new Student();
          student.id = data[j].id;
          student.lastName = data[j].lastname;
          student.firstName = data[j].firstname;
          student.progressionTotal.totalSkills = data[j].progression.totalSkills;
          student.progressionTotal.studentValidations = data[j].progression.studentValidations;
          student.progressionTotal.teacherValidations = data[j].progression.teacherValidations;

            this.formations[i].students.push(student);
          }

          console.log('students: ', this.formations);

        });

    }

  }

  public showDashboard(id): void {

    this.navCtrl.setRoot(DashboardPage, id);

  }

}
