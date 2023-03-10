import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss'],
})
export class EmployesComponent implements OnInit {
  departmentList: any[];
  employeeList: any[];
  allEmployeeList: any[];

  createEmp: FormGroup;
  isSubmit = false;

  constructor(private userService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empForm();
    this.getDepartmentList();
    this.getAllEmpList();
  }

  empForm() {
    this.createEmp = this.fb.group({
      EmployeeName: new FormControl('', [Validators.required]),
      ContactNo: new FormControl('', [Validators.required]),
      EmailId: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      DeptId: new FormControl('', [Validators.required]),
      ReportsTo: new FormControl('', [Validators.required]),
    });
  }

  getDepartmentList() {
    this.userService.getDepartmentList().subscribe((res) => {
      this.departmentList = res;
    });
  }

  onChangeDepartmentId(event: any) {
    const id = event.target.value;
    this.userService.getEmployeesListbyId(id).subscribe((res) => {
      this.employeeList = res;
    });
  }

  getAllEmpList() {
    this.userService.getAllEmployesList().subscribe((res) => {
      this.allEmployeeList = res;
    });
  }

  onSaveEmployee() {
    this.isSubmit = true;
    if (this.createEmp.invalid) {
      return;
    }
    const empDetails = this.createEmp.value;
    // console.log(empDetails);
    this.userService.createEmploye(empDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllEmpList();
        this.onReset();
      },
      error: (error) => {
        alert(error.error?.Message);
      },
    });
  }

  onReset() {
    this.createEmp.reset();
    this.isSubmit = false;
  }
}
