import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

// Models
import { ProgressionDetails } from './../../models/progression-detail.model';
import { ProgressionTotal } from './../../models/progression-total.model';
import { Student } from './../../models/student.model';
import { Module } from './../../models/module.model';
import { Skill } from './../../models/skill.model';

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

  public student: Student = new Student();
  public modules: Module[] = [];
  public moduleSkills: any;
  public shownGroup: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider) {

    this.platform.ready().then(() => {

      this.setStudent(this.navParams.get('formation'), this.navParams.get('student'));

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  public toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  public isGroupShown(group) {
    return this.shownGroup === group;
  }

  private setStudent(formationId: any, studentId: void): void {

    this.apiService.get('getStudentDatas/' + studentId + '/ofFormation/' + formationId)
      .then((data: any) => {

        console.log('student_data: ', data);

        this.student = new Student(data.student.user_id, data.student.user_lastname, data.student.user_firstname);

        console.log('student: ', this.student);

        this.modules = [];
        let studentModule: Module;

        for (let i = 0; i < data.modules.length; i++) {

          studentModule = new Module(data.modules[i].id, data.modules[i].name, new ProgressionTotal(data.modules[i].totalSkills, data.modules[i].progression.student, data.modules[i].progression.teacher));

          for (let j = 0; j < data.modules[i].skills.length; j++) {

            studentModule.addSkill(new Skill(data.modules[i].skills[j].id, data.modules[i].skills[j].name, new ProgressionDetails(data.modules[i].skills[j].progression.student_progression_id, data.modules[i].skills[j].progression.student_validation, data.modules[i].skills[j].progression.student_validation_date, data.modules[i].skills[j].progression.teacher_validation, data.modules[i].skills[j].progression.teacher_validation_date)));

          }

          this.modules.push(studentModule);

        }

        console.log('modules: ', this.modules);

      });

  }

  public showSkills(moduleId: any): void {

    this.moduleSkills = this.modules[this.modules.findIndex((module, index, tab) => { return module['id'] == moduleId })];

  }

  public updateValidation(progressionId: any, validation: any): void {

    console.log('test update: ', [progressionId, validation]);

    this.apiService.put('progression/updateTeacherValidation', { progression_id: progressionId, teacher_validation: validation })
      .then(data => { console.log('update validation: ', data) });
  }

}
