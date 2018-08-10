import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { environment } from './../../environments/environment';

// Models
import { Formation } from './../../models/formation.model';
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

  environment = environment;
  public student: Student = new Student();
  public modules: Module[] = [];
  public moduleSkills: any;
  public lastname: any;
  public firstname: any;
  public avatar: any;
  public nameFormation: any;
  public max = 100;
  public current = 35;
  public totalSkills = 0;
  public totalStudentValidation = 0;
  public totalTeacherValidation = 0;
  public me: any;
  public dataFormation: any;
  public formation: any;
  public formationId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {

    this.platform.ready().then(() => {

      this.lastname = this.navParams.get('lastname');
      this.firstname = this.navParams.get('firstname');
      this.avatar = this.navParams.get('avatar');
      this.formationId = this.navParams.get('formation_id');
      this.formation = {};

      this.setStudent();
      console.log('connection réussi !');

    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  private setStudent() {
    this.apiService.get('formation/' + this.formationId).then((data: any) => {
      
      this.formation = data;

      console.log('formation: ', this.formation);
    });

    this.apiService.get('getFormations')
      .then((data: any) => {

        this.modules = [];
        let studentModule: Module;

        for (let i = 0; i < data.length; i++) {

          studentModule = new Module(data[i].module.id, data[i].module.name,// permet d'injecter les modules dans ma variable StudentModule
            new ProgressionTotal(data[i].module.totalSkills,
              data[i].module.progression.student,
              data[i].module.progression.teacher)
          );

          for (let j = 0; j < data[i].module.skills.length; j++) {
            this.totalSkills++;
            studentModule.addSkill(new Skill(
              data[i].module.skills[j].id,
              data[i].module.skills[j].name,
              new ProgressionDetails(data[i].module.skills[j].progression.student_progression_id,
                data[i].module.skills[j].progression.student_validation,
                data[i].module.skills[j].progression.student_validation_date,
                data[i].module.skills[j].progression.teacher_validation,
                data[i].module.skills[j].progression.teacher_validation_date)
            ));

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

    this.apiService.put('progression/updateStudentValidation', { progression_id: progressionId, student_validation: validation })
      .then(data => { console.log('update validation: ', data) });

  }

  onChange(moduleId: any) {
    console.log('onChange');
    const index = this.modules.indexOf(moduleId);
    if (index === -1) {
      this.modules.push(moduleId);
    } else {
      this.modules.splice(index, 1);
    }
  }

  isStudentValidated(moduleId: any) {
    return this.modules.indexOf(moduleId) >= 0;
  }

  stateText(moduleId: any) {
    return (this.modules.indexOf(moduleId) >= 0) ? 'validé' : 'à valider';
  }



}
