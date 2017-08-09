/**
 * Created by rene.zarwel on 08.08.17.
 */
import {Component, OnInit} from '@angular/core';

import { Employee, EmployeeService } from './employee.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .then(employees => this.employees = employees.slice(1, 5));
  }
}
