import { Formation } from './../../models/formation.model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

// Models
import { Student } from './../../models/student.model';
import { Module } from './../../models/module.model';
import { Skill } from './../../models/skill.model';
import { User } from './../../models/user.model';

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
  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {

    this.platform.ready().then(() => {

      this.setStudent();
      console.log('connection réussi !');

    });

  }

  //==================================================================|| Parti de l'élèvé connecté ||==================================================================//

  private setStudent(): void {
    this.apiService.get('getFormations')
      .then((data: any) => {

        this.modules = [];
        let studentModule: Module;
        let module: any;

        for (let i = 0; i < data.length; i++) {

          module = data[i].module;

          studentModule = new Module();
          studentModule.id = module.id;
          studentModule.name = module.name;
          studentModule.progressionTotal.totalSkills = module.totalSkills;
          studentModule.progressionTotal.studentValidations = module.progression.student;
          studentModule.progressionTotal.teacherValidations = module.progression.teacher;

          let skill: Skill;

          for (let j = 0; j < module.skills.length; j++) {

            skill = new Skill();
            skill.id = module.skills[j].id;
            skill.name = module.skills[j].name;
            skill.progressionDetail.studentProgressionId = module.skills[j].progression.student_progression_id;
            skill.progressionDetail.studentValidation = module.skills[j].progression.student_validation;
            skill.progressionDetail.studentValidationDate = module.skills[j].progression.student_validation_date;
            skill.progressionDetail.teacherValidation = module.skills[j].progression.teacher_validation;
            skill.progressionDetail.teacherValidationDate = module.skills[j].progression.teacher_validation_date;

            studentModule.skills.push(skill);

          }

          this.modules.push(studentModule);

        }

        console.log('module: ', this.modules);
      })
  }

  //==================================================================|| Parti du formateur connecté ||==================================================================//

  private setStudentByTeacher() {
    this.apiService.get('getFormations')
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

  public updateValidate(progressionId: any, validation: any): void {

    console.log('test_update', [progressionId, validation]);

    this.apiService.put('progression/updateStudentValidation', { progression_id: progressionId, student_validation: validation })
      .then(data => {

        console.log('update_student: ', data)

      });
  }

  public getUser() {
    this.apiService.get('users')
      .then((data: any) => {
        this.user = new User();
        this.user.id = data.id;
        this.user.lastname = data.lastname;
        this.user.firstname = data.firstname;

        console.log('user_connected_data: ', this.user);
      })
  }

  private setRoot() {
    return this.authService.getUserTypeId().then(data => {
      if (data == 3) {

        this.setStudent();

      } else {

        this.setStudentByTeacher();

      }
    })
  }

}
