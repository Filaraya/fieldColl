//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FieldCollAppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FieldCollAppProvider {

  incidents = [];

  constructor() {
    console.log('Hello FieldCollAppServiceProvider');
  }

  getIncidents() {
    return this.incidents;
  }

  removeIncident(index) {
    this.incidents.splice(index, 1);
  }

  addIncident(incident) {
    this.incidents.push(incident);
  }

  editIncident(incident, index) {
    this.incidents[index] = incident;
  }

}
