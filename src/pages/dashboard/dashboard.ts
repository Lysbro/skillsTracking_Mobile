import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';

// Models
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider) {

    this.platform.ready().then(() => {

      this.setStudent(this.navParams.get('formation'), this.navParams.get('student'));
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  private setStudent(formationId: any, studentId: void): void {

    this.apiService.get('getStudentDatas/' + studentId + '/ofFormation/' + formationId)
    .then((data: any) => {

      console.log('student_data: ', data);

      this.student = new Student();
      this.student.id = data.student.user_id;
      this.student.lastName = data.student.user_lastname;
      this.student.firstName = data.student.user_firstname;

      console.log('student: ', this.student);

      this.modules = [];
      let studentModule: Module;

      for (let i = 0; i < data.modules.length; i++) {

        studentModule = new Module();
        studentModule.id = data.modules[i].id;
        studentModule.name = data.modules[i].name;
        studentModule.progressionTotal.totalSkills = data.modules[i].totalSkills;
        studentModule.progressionTotal.studentValidations = data.modules[i].progression.student;
        studentModule.progressionTotal.teacherValidations = data.modules[i].progression.teacher;

        let skill: Skill;

        for (let j = 0; j < data.modules[i].skills.length; j++) {

          skill = new Skill();
          skill.id = data.modules[i].skills[j].id;
          skill.name = data.modules[i].skills[j].name;
          skill.progressionDetail.studentProgressionId = data.modules[i].skills[j].progression.student_progression_id;
          skill.progressionDetail.studentValidation = data.modules[i].skills[j].progression.student_validation;
          skill.progressionDetail.studentValidationDate = data.modules[i].skills[j].progression.student_validation_date;
          skill.progressionDetail.teacherValidation = data.modules[i].skills[j].progression.teacher_validation;
          skill.progressionDetail.teacherValidationDate = data.modules[i].skills[j].progression.teacher_validation_date;

          studentModule.skills.push(skill);

        }
        
        this.modules.push(studentModule);

      }

      console.log('modules: ', this.modules);

    });

  }

  public showSkills(moduleId: any): void {

    this.moduleSkills = this.modules[this.modules.findIndex((module, index, tab) => { return module['id'] == moduleId })];

  } 

}
