import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-layout',
  templateUrl: './emp-layout.component.html',
  styleUrls: ['./emp-layout.component.scss'],
})
export class EmpLayoutComponent implements OnInit {
  loggedUserData: any;
  constructor() {}

  ngOnInit(): void {
    const localData = localStorage.getItem('reqObj');
    this.loggedUserData = JSON.parse(localData);
  }
}
