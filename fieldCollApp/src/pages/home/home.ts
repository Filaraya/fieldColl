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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Incidents";
  socialSharing: any;

  incidents = [];
  
  
  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: FieldCollAppProvider, 
    public inputDialogService: InputdialogserviceProvider,
    public SocialSharing: SocialSharing){
      dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadIncidents();
      });

    
  }

  ionViewDidLoad() {
    this.loadIncidents();
  }
  loadIncidents() {
    return this.dataService.getIncidents()
    .subscribe(
      incidents => this.incidents = incidents,
      error => this.errorMessage =<any>error);
    
  }

  removeIncident(id) {

    console.log("Removing Incident - ", id.titile);
    const toast = this.toastCtrl.create({
      message: 'Removing Incident - ' + id.title + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeIncident(id);  
  }

  async shareIncident(incident,index) {
    console.log("Sharing Item - ", incident,index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });

    toast.present();

    let message = "Incident - Name: " + incident.title + " - rate: " + incident.rate;
    let subject = "Shared via app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });    

  }

  // Edit Incident
  async editIncident(incident,index) {
    
    console.log("Edit Incident - ", incident,index);
    const toast = this.toastCtrl.create({
      message: `Editing Incident - ${incident.title} ...`,
      duration: 3000
    });
    (await toast).present();
    
    this.inputDialogService.showPrompt(incident,index);
  }  
  // Add Incident
  addIncident() {
    console.log("Adding Incident");
    this.inputDialogService.showPrompt();
  }

  
}
