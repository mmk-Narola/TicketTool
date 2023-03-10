import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginUser = this.loginForm.value;
    this.userService.loginUser(loginUser).subscribe((res) => {
      console.log(res);
      localStorage.setItem('reqObj', JSON.stringify(res));
      localStorage.setItem('token', JSON.stringify(res.Token));
      if (res.Role == 'Admin') {
        this.router.navigateByUrl('Employee');
      } else if (res.Role == 'Employee') {
        this.router.navigateByUrl('EmpTickets');
      } else if (res.Role == 'AdminDept') {
        this.router.navigateByUrl('DeptTickets');
      }

      this.reset();
    });
  }

  reset() {
    this.isSubmit = false;
    this.loginForm.reset();
  }
}
