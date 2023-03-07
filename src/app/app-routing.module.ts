import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { EmployesComponent } from './pages/employes/employes.component';
import { DepartmentComponent } from './pages/department/department.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { DeptLayoutComponent } from './pages/dept-layout/dept-layout.component';
import { EmpLayoutComponent } from './pages/emp-layout/emp-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tickets',
        component: TicketsComponent,
      },
      {
        path: 'Employee',
        component: EmployesComponent,
      },
      {
        path: 'Department',
        component: DepartmentComponent,
      },
      {
        path: 'Leaves',
        component: LeavesComponent,
      },
    ],
  },
  {
    path: '',
    component: EmpLayoutComponent,
    children: [
      {
        path: 'EmpTickets',
        component: TicketsComponent,
      },
      {
        path: 'Leaves',
        component: LeavesComponent,
      },
    ],
  },
  {
    path: '',
    component: DeptLayoutComponent,
    children: [
      {
        path: 'DeptTickets',
        component: TicketsComponent,
      },
      {
        path: 'DeptLeaves',
        component: LeavesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
