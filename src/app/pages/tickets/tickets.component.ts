import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  ticketObj = {
    RequestId: 0,
    RequestNo: '',
    EmployeeId: 0,
    CreatedDate: '',
    ExpectedEndDate: '',
    Severity: '',
    DeptId: 0,
    CompletedDate: '',
    AssignedTo: 0,
    State: '',
    RequestDetails: '',
  };
  departmentList: any[];
  getTicketListByLoggedEmployee: any;
  createTicket: FormGroup;
  loggedUserData: any;

  isOpenTicket: boolean = false;
  isAssignTicket: boolean = false;
  currentTicketDeptId: number = 0;
  EmpBydepartmentList: any[] = [];
  assignObj = {
    RequestId: 0,
    AssignedTo: 0,
  };

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('reqObj');
    this.loggedUserData = JSON.parse(localData);
    this.ticketObj.EmployeeId = this.loggedUserData.EmployeeId;

    if (this.loggedUserData.Role === 'Employee') {
      this.getTicketReqByLoggEmp(this.loggedUserData.EmployeeId);
    } else if (this.loggedUserData.Role === 'Admin') {
      this.getAllTickets;
    } else if (this.loggedUserData.Role == 'AdminDept') {
      this.getAssignedTicketBYEmpId(this.loggedUserData.EmployeeId);
    }

    this.getDepartmentList();
    this.ticketForm();
    this.getAllTickets();
  }

  ticketForm() {
    this.createTicket = this.fb.group({
      DeptId: new FormControl('', [Validators.required]),
      Severity: new FormControl('', [Validators.required]),
      RequestDetails: new FormControl('', [Validators.required]),
    });
  }

  getDepartmentList() {
    this.userService.getDepartmentList().subscribe((res) => {
      this.departmentList = res;
    });
  }

  getTicketReqByLoggEmp(id: any) {
    this.userService.GetAllRequestByEmployee(id).subscribe((res) => {
      console.log(res);
      this.getTicketListByLoggedEmployee = res;
    });
  }

  onCreateTicket() {
    this.ticketObj.DeptId = this.createTicket.get('DeptId').value;
    this.ticketObj.Severity = this.createTicket.get('Severity').value;
    this.ticketObj.RequestDetails =
      this.createTicket.get('RequestDetails').value;
    this.userService.createTicketReq(this.ticketObj).subscribe((res) => {
      alert('Ticktet Create');
      console.log(res);
      this.getTicketReqByLoggEmp(this.ticketObj.EmployeeId);
    });
  }

  getAllTickets() {
    this.userService.getAllTickets().subscribe((res) => {
      this.getTicketListByLoggedEmployee = res;
    });
  }

  getAssignedTicketBYEmpId(id: any) {
    this.userService.getAssignedTicketBYEmpId(id).subscribe((res) => {
      console.log('djfbdshfb', res);
    });
  }

  onAssignEmp() {
    this.http
      .post(
        'https://akbarapi.funplanetresort.in/api/MyRequest/AssignRequest',
        this.assignObj
      )
      .subscribe((res: any) => {
        this.getAllTickets();
      });
  }
  startRequest(id: number) {
    this.http
      .post(
        'https://akbarapi.funplanetresort.in/api/MyRequest/startRequest?id=' +
          id,
        {}
      )
      .subscribe((res: any) => {
        this.getAssignedTicketBYEmpId(id);
      });
  }
  closeRequest(id: number) {
    this.http
      .post(
        'https://akbarapi.funplanetresort.in/api/MyRequest/closeRequest?id=' +
          id,
        {}
      )
      .subscribe((res: any) => {
        this.getAssignedTicketBYEmpId(id);
      });
  }

  getEmployeeByDept() {
    this.http
      .get(
        'https://akbarapi.funplanetresort.in/api/MyRequest/GetEmployeeByDeptId?id=' +
          this.currentTicketDeptId
      )
      .subscribe((res: any) => {
        this.EmpBydepartmentList = res;
      });
  }

  assign(reqId: number, deptId: number) {
    this.isAssignTicket = true;
    this.assignObj.RequestId = reqId;
    this.currentTicketDeptId = deptId;
    this.getEmployeeByDept();
  }

  onReset() {
    this.createTicket.reset();
  }
}
