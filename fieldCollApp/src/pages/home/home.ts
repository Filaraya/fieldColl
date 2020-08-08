import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// provider injection 
import { FieldCollAppProvider } from '../../providers/field-coll-app/field-coll-app';
// inputDailogService
import { InputdialogserviceProvider } from '../../providers/inputdialogservice/inputdialogservice';
// import social sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// date picker
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: FieldCollAppProvider, 
    public inputDialogService: InputdialogserviceProvider,
    public socialSharing: SocialSharing,
    public datePicker: DatePicker)
     {

    
  }
  loadIncidents() {
    return this.dataService.getIncidents();
  }

  removeIncident(incident, index) {
    console.log("Removing Incident - ", incident, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Incident - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeIncident(index);  
  }

  shareIncident(incident, index) {
    console.log("Sharing incident - ", incident, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Incident - ' + index + " ...",
      duration: 3000
    });

    toast.present();

    let message = "Incident - Name: " + incident.name + " - rate: " + incident.quantity;
    let subject = "Shared via app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });    

  }
  addIncident() {
    console.log("Adding Incident");
    this.inputDialogService.showPrompt();
}
  editIncident(incident, index) {
    console.log("Edit Incident - ", incident, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Incident - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(incident, index);
  }  

  
}
