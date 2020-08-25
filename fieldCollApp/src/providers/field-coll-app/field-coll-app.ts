import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,Subject} from 'rxjs';
import {map,catchError} from 'rxjs/Operators';


/*
  Generated class for the FieldCollAppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FieldCollAppProvider {

  incidents:any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8000";

  constructor(public http:HttpClient) { 
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getIncidents():Observable<object[]>{
    return this.http.get(`${this.baseURL}/api/fieldcoll`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData (res:Response){
    let body =res;
    return (body || {}) as object[];
  }

  private handleError (error:Response | any ) {
    let errMsg:string;
    if (error instanceof Response){
      const err = error || '';
      errMsg =`${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg =error.message ? error.message : error.toString();
    }
    console.error (errMsg);
    return Observable.throw(errMsg);
  }

  //to remove
  removeIncident(id) {
    console.log ("### Remove Incident - Id = ", id)
    this.http.delete (`${this.baseURL}/api/fieldcoll/${id}`).subscribe(res => {
      this.incidents=res;
      this.dataChangeSubject.next(true);
    });
    
  }
// adding incidents
addIncident(incident) {
  console.log("Adding Incident:: ", incident.title)
  this.http.post(`${this.baseURL}/api/fieldcoll/`,incident).subscribe(res=>{
    this.incidents=res;
    this.dataChangeSubject.next(true);
  });

}

  //editing incidents
  editIncident(incident,id) {
    console.log("Editing incident = ", incident);
    this.http.put(`${this.baseURL}/api/fieldcoll/${id}`, incident).subscribe(res=>{
      this.incidents = res;
      this.dataChangeSubject.next(true);
  });

}

}
