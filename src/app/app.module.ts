import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import {EmployeeDetailComponent} from "./employee-detail.component";
import {EmployeesComponent} from "./employees.component";
import {EmployeeService} from "./employee.service";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employee/:oid',
        component: EmployeeDetailComponent
      }
    ])
  ],
  exports: [ RouterModule ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]

})
export class AppModule {
}
