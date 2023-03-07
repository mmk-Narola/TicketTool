import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployesComponent } from './pages/employes/employes.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { EmpLayoutComponent } from './pages/emp-layout/emp-layout.component';
import { DeptLayoutComponent } from './pages/dept-layout/dept-layout.component';
import { LayoutComponent } from './pages/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployesComponent,
    LeavesComponent,
    TicketsComponent,
    DepartmentComponent,
    LayoutComponent,
    LoginComponent,
    EmpLayoutComponent,
    DeptLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
