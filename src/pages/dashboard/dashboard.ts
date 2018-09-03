import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


// Providers
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { environment } from './../../environments/environment';

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

  @ViewChild(Slides) slides: Slides;

  environment = environment;
  public student: Student = new Student();
  public modules: Module[] = [];
  public moduleSkills: any;
  public moduleSelected = 0;
  public allSkills = [];
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
            if (data[i].module.skills[j].progression.student_validation) {
              this.totalStudentValidation++;
              console.log('student_validation: ', this.totalStudentValidation);
            }

            if (data[i].module.skills[j].progression.teacher_validation) {
              this.totalTeacherValidation++;
              console.log('teacher_validation: ', this.totalTeacherValidation);
            }

          }

          this.modules.push(studentModule);
          this.allSkills.push(studentModule);

        }

        console.log('modules: ', this.modules);

      });

  }

  public filterByModule(moduleId) {
    console.log('filterByModule moduleId', moduleId);
    console.log('filterByModule this.allSkills', this.allSkills);
    this.moduleSkills = [];
    this.moduleSelected = moduleId;
    if (this.moduleSelected === 0) {
      this.moduleSkills = this.allSkills;
      console.log('filterByModule this.skills', this.moduleSkills[0].totalSkills);

    } else {
      console.log('filterByModule moduleId', moduleId);
      for (let i = 0; i < this.allSkills.length; i++) {
        if (this.allSkills[i].module.id === this.moduleSelected) {
          this.moduleSkills.push(this.allSkills[i]);
        }
      }
    }
  }
  public showSkills(moduleId: any): void {

    this.moduleSkills = this.modules[
      this.modules.findIndex((module, index, tab) => {
        return module['id'] == moduleId
      }
      )
    ];

  }

  public updateValidation(progressionId: any, validation: any): void {

    console.log('test update: ', [progressionId, validation]);

    this.apiService.put('progression/updateStudentValidation', { progression_id: progressionId, student_validation: validation })
      .then(data => { console.log('update validation: ', data) });

  }

  goToSlide() {
    this.slides.slideTo(1);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    let reroll = this.slides.isEnd();
    if (reroll) {
      this.slides.loop = true;
    }
  }

  slideNext() {
    this.slides.slideNext();
  }

  slidePrev() {
    this.slides.slidePrev();
  }
}
