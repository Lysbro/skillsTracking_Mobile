import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

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
  formations: any[];
  eleves: any[];
  formationId: number;
  public item;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public apiService: ApiServiceProvider) {
    this.platform.ready().then(() => {
      this.getFormations();
      this.getStudentsByFormation();
    });

  }

  //================ fonctions accordion ================
  toggleSection(i) { this.formations[i].open = !this.formations[i].open; }
  toggleItem(i, j) { this.formations[i].children[j].open = !this.formations[i].children[j].open; }

  getStudentsByFormation(): any {
    return this.apiService.get('getStudentsOfFormation/' + this.formationId).then(data => {
      this.eleves = data;
      console.log('eleves', this.eleves);
    });
  }

  getFormations(): any {
    return this.apiService.get('formations').then(data => {
      this.formations = data.data;
      console.log('formations', this.formations);
    });
  }

  getFormationId(item) {
    return this.formationId = item.id;
  }

}
