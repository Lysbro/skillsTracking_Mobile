import { Planning } from './../../models/planning.model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the PlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-planning',
  templateUrl: 'planning.html',
})
export class PlanningPage {

  public planning: Planning[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer, private file: File, private transfer: FileTransfer, private platform: Platform, private apiService: ApiServiceProvider) {
    this.platform.ready().then(() => {
      this.getPDF();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanningPage');
  }

  getPDF(){

    this.apiService.get('getCalendar/ofFomation/1')
    .then((data: any) => {

      for(let i = 0; i < data.length; i++) {
        
        this.planning.push(new Planning(data[i].id, data[i].file_name, data[i].created_at, data[i].updated_at, data[i].file_url));
      
      }

      console.log('planning:', this.planning);
    });
  }

  openLocalPdf() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
  }


  downloadAndOpenPdf(PDF: any, planningId: any): void {
    let path = null;
 
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
 
    const transfer: FileTransferObject = this.transfer.create();

    let apiUrl = 'http://skillstracking.motjo.io/uploads/calendars/';
    let pdf = PDF;
    let namePDF = PDF;
    let id = planningId;

    transfer.download(apiUrl + pdf, path + namePDF).then(entry => {
      
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
      console.log('download complete: ' + entry.toURL());

    });
  }
}
