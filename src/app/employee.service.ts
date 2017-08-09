/**
 * Created by rene.zarwel on 08.08.17.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  private employeesUrl = 'http://localhost:8080/employees';  // URL to web api

  constructor(private http: Http) { }

  getEmployees(): Promise<Employee[]>{
    let headers = new Headers();
    EmployeeService.createAuthorizationHeader(headers);

    return this.http.get(this.employeesUrl, {
      headers: headers
    })
      .toPromise()
      .then(response => response.json()._embedded.employees as Employee[])
      .catch(EmployeeService.handleError);
  }

  getEmployee(selflink: Link): Promise<Employee> {
    let headers = new Headers();
    EmployeeService.createAuthorizationHeader(headers);
    return this.http.get(selflink.href, {
      headers: headers
    })
      .toPromise()
      .then(response => response.json() as Employee)
      .catch(EmployeeService.handleError);
  }

  getEmployeeWithID(oid: string): Promise<Employee> {
    return this.getEmployee({href: this.employeesUrl + '/' + oid})
  }

  saveEmployee(employee: Employee): Promise<Employee> {
    let headers = new Headers();
    EmployeeService.createAuthorizationHeader(headers);
    return this.http.post(this.employeesUrl, employee ,{
      headers: headers
    })
      .toPromise()
      .then(response => response.json() as Employee)
      .catch(EmployeeService.handleError);
  }

  updateEmployee(selflink: Link, employee: Employee): Promise<Employee> {
    let headers = new Headers();
    EmployeeService.createAuthorizationHeader(headers);
    return this.http.put(selflink.href, employee ,{
      headers: headers
    })
      .toPromise()
      .then(response => response.json() as Employee)
      .catch(EmployeeService.handleError);
  }

  updateEmployeeWithID(oid: string, employee: Employee): Promise<Employee> {
    return this.updateEmployee({href: this.employeesUrl + '/' + oid}, employee)
  }

  private static createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'bearer ' +
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.ytIMjZatFOM1QZ--0vB7HLVNg_Gzy0X-TARSGLtux5M');
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

export class Employee {
  oid: string;
  name: string;
}

export class Link {
  href: string;
}
