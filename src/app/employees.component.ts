/**
 * Created by rene.zarwel on 08.08.17.
 */
import {Component, OnInit} from '@angular/core';
import {Employee, EmployeeService} from "./employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit{
  ngOnInit(): void {
    this.getEmployees();
  }

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  employees: Employee[] = [];

  onSelect(employee: Employee): void {
    this.router.navigate(['/employee', employee.oid]);
  }

  getEmployees(): void {
    this.employeeService.getEmployees().then(employees => this.employees = employees)
  }
}
