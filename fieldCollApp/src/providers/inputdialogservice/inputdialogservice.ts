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
      message: incident ? "Please edit incident..." : "Please enter incident...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: incident ? incident.name : null
        },
        {
          name: 'rate',
          placeholder: 'Bad/good/excellent',
          value: incident ? incident.rate : null
        },
        {
          name: 'date',
          placeholder: 'Select Date',
          value: incident ? incident.date : null
        },
        {
          name: 'comment',
          placeholder: 'write your comment',
          value: incident ? incident.comment : null
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
          handler: incident => {
            console.log('Saved clicked', incident);
            if (index !== undefined) {
              this.dataService.editIncident(incident, index);
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
