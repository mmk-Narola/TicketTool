import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = environment.apiRoot;
  constructor(private http: HttpClient) {}

  loginUser(details: any): Observable<any> {
    return this.http
      .post(this.url + '/Login', details)
      .pipe(catchError(this.handleError));
  }

  getDepartmentList(): Observable<any> {
    return this.http
      .get(this.url + '/GetDepartments')
      .pipe(catchError(this.handleError));
  }

  getEmployeesListbyId(deptId: string): Observable<any> {
    return this.http
      .get(this.url + `/GetEmployeeByDeptId?id=${deptId}`)
      .pipe(catchError(this.handleError));
  }

  createEmploye(empDetails: any): Observable<any> {
    return this.http.post(this.url + '/CreateEmployee', empDetails);
  }

  getAllEmployesList(): Observable<any> {
    return this.http.get(this.url + '/GetEmployees');
  }

  createTicketReq(ticketObj): Observable<any> {
    return this.http
      .post(this.url + '/CreateRequestMaster', ticketObj)
      .pipe(catchError(this.handleError));
  }

  GetAllRequestByEmployee(id: any) {
    return this.http
      .get(this.url + `/GetAllRequestByEmployee?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllTickets(): Observable<any> {
    return this.http
      .get(this.url + '/GetAllRequest')
      .pipe(catchError(this.handleError));
  }

  getAssignedTicketBYEmpId(id: any): Observable<any> {
    return this.http
      .get(this.url + `/GetAssignedRequestByUserId?userid=${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alert(error.error);
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
