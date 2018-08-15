import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

// Models
import { ProgressionDetails } from './../../models/progression-detail.model';
import { ProgressionTotal } from './../../models/progression-total.model';
import { Student } from './../../models/student.model';
import { Module } from './../../models/module.model';
import { Skill } from './../../models/skill.model';

// Env
import { Environment } from './../../environment/environment';

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

  private baseUrl: any;

  public user: any;
  public student: Student = new Student();
  public modules: Module[] = [];
  public moduleSkills: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private apiService: ApiServiceProvider, private authService: AuthServiceProvider) {

    this.platform.ready().then(() => {

      this.authService.getAuth()
      .then((user: any) => {

        this.user = user;

        let url: any;

        switch(this.user.user_type_id) {

          case 2: 
            this.baseUrl = Environment._TEACHER_URL;
            url = this.baseUrl.dashboardUrl1 + this.navParams.get('student') + this.baseUrl.dashboardUrl2 + this.navParams.get('formation');
            this.setDashBoard(url, this.user);
            break;
          case 3: 
            this.baseUrl = Environment._STUDENT_URL;
            url = this.baseUrl.dashboardUrl;
            this.student = new Student(this.user.student_id, this.user.lastname, this.user.firstname, this.user.avatar, this.user.email, this.user.gender);
            this.setDashBoard(url, this.user);
            break;
          default:
            console.log('type utilisateur non-reconnu');

        }

      });
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  private setDashBoard(url: any, user: any) {

    this.apiService.get(url)
    .then((data: any) => {

      console.log('student_data: ', data);

      let modulesData: any;
      this.modules = [];
      let studentModule: Module;

      switch (user.user_type_id) {
        case 2:
          modulesData = data['modules'];
          this.student = new Student(data.student.user_id, data.student.user_lastname, data.student.user_firstname, data.student.user_avatar);

          for (let i = 0; i < modulesData.length; i++) {

            studentModule = new Module(modulesData[i].id, modulesData[i].name, new ProgressionTotal(modulesData[i].totalSkills, modulesData[i].progression.student, modulesData[i].progression.teacher));

            for (let j = 0; j < modulesData[i].skills.length; j++) {

              studentModule.addSkill(new Skill(modulesData[i].skills[j].id, modulesData[i].skills[j].name, new ProgressionDetails(modulesData[i].skills[j].progression.student_progression_id, modulesData[i].skills[j].progression.student_validation, modulesData[i].skills[j].progression.student_validation_date, modulesData[i].skills[j].progression.teacher_validation, modulesData[i].skills[j].progression.teacher_validation_date)));

            }

            this.modules.push(studentModule);

          }

          break;
        case 3: 
          modulesData = data;

          for (let i = 0; i < modulesData.length; i++) {

            studentModule = new Module(modulesData[i].module.id, modulesData[i].module.name, new ProgressionTotal(modulesData[i].module.totalSkills, modulesData[i].module.progression.student, modulesData[i].module.progression.teacher));
            
            for (let j = 0; j < modulesData[i].module.skills.length; j++) {

              studentModule.addSkill(new Skill(modulesData[i].module.skills[j].id, modulesData[i].module.skills[j].name, new ProgressionDetails(modulesData[i].module.skills[j].progression.student_progression_id, modulesData[i].module.skills[j].progression.student_validation, modulesData[i].module.skills[j].progression.student_validation_date, modulesData[i].module.skills[j].progression.teacher_validation, modulesData[i].module.skills[j].progression.teacher_validation_date)));

            }

            this.modules.push(studentModule);

          }

          break;
        default:
          console.log('type utilisateur non-reconnu');

      }

      console.log('modules: ', this.modules);

    });

  }

  public showSkills(moduleId: any): void {

    this.moduleSkills = this.modules[this.modules.findIndex((module, index, tab) => { return module['id'] == moduleId })];
    
  } 

  public updateValidation(progressionId:any, validation: any): void {

    console.log('test update: ', [progressionId, validation]);

    let data_validation: any;

    switch (this.user.user_type_id) {

      case 2:
        data_validation = { progression_id: progressionId, teacher_validation: validation };
        break;
      case 3:
        data_validation = { progression_id: progressionId, student_validation: validation };
        break;

    }

    this.apiService.put(this.baseUrl.dashboardUrlSkillUpdate, data_validation)
    .then(data => { console.log('update validation: ', data) });

  }

}
