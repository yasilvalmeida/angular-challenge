import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _apiURL = "http://161.97.108.87";
  _errorMessage: string = '';
  /*
  * @param {HttpClient} _http
  */
  constructor
  (
    private _http: HttpClient
  ) 
  {}
  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let _error: any = error;
    //console.log("from else", error);
    //console.log("detail", _error.message);
    this._errorMessage = _error.message;
    // Return an observable with a user-facing error message.
    return throwError(this._errorMessage);
  }
  // Get all users
  getAllUsers(): Observable<any> {
    return this._http
      .get(`${this._apiURL}/Users/GetUsers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add new user
  addNewUser(user: any): Observable<any> {
    return this._http
      .post(`${this._apiURL}/Users/CreateUser`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an user
  updateUser(user: any): Observable<any> {
    return this._http
      .post(`${this._apiURL}/Users/UpdateUser`, user)
      .pipe(
        catchError(this.handleError)
      );
  }
}
