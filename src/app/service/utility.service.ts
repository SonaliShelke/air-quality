import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  headers: any;
  public API_ENDPOINT = 'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?';

  public params_object = {
    API_KEY: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
    FORMAT: 'json',
    OFFSET: '0',
    LIMIT: '10'
  }

  constructor(public http: HttpClient) {
    this.headers = new Headers();
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };




  get(params: any, options: any = this.headers): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('api-key', this.params_object.API_KEY);
    urlSearchParams.append('format', this.params_object.FORMAT);
    urlSearchParams.append('offset', this.params_object.OFFSET);
    urlSearchParams.append('limit', this.params_object.LIMIT);

    return this.http
      .get(this.API_ENDPOINT + urlSearchParams.toString())
      .pipe(
        retry(2),
        catchError(this.handleError))

  }
}
