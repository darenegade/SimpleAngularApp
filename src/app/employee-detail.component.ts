/**
 * Created by rene.zarwel on 08.08.17.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Employee, EmployeeService} from './employee.service';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: [ './employee-detail.component.css' ]
})
export class EmployeeDetailComponent implements OnInit{

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  employee: Employee;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployeeWithID(params.get('oid')))
      .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.updateEmployeeWithID(params.get('oid'), this.employee))
      .subscribe();
    this.goBack();
  }
}
