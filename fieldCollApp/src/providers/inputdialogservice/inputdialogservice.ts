//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FieldCollAppProvider } from '../../providers/field-coll-app/field-coll-app';
import { DatePicker } from '@ionic-native/date-picker/ngx';
/*
  Generated class for the InputdialogserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputdialogserviceProvider {

  constructor(
    public alertCtrl: AlertController, 
    public dataService: FieldCollAppProvider,
    public datePicker: DatePicker) {
    console.log('Hello InputDialogServiceProvider Provider');
    
  }
    

  showPrompt(incident?, index? ) {
    const prompt = this.alertCtrl.create({
      title: incident ? 'Edit incident' : 'Add incident',
      message: incident ? "Please edit incident..." : "Please add incident...",
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'title Name',
          value: incident ? incident.title : null
        },
        
        
        {
          name: 'description',
          type: 'text',
          placeholder: 'write description',
          value: incident ? incident.description : null
        },
        {
          name: 'rate',
          placeholder: 'Bad/good/excellent',
          value: incident ? incident.rate : null
        },

        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (incident) => {
            console.log('Saved clicked', incident);
            if (index !== undefined) {
              this.dataService.editIncident(incident,index);
            }
            else {
              this.dataService.addIncident(incident);
            }

          }
        }
      ]
    });
    prompt.present();
  }

}
