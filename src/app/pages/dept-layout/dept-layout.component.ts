import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-layout',
  templateUrl: './dept-layout.component.html',
  styleUrls: ['./dept-layout.component.scss'],
})
export class DeptLayoutComponent implements OnInit {
  loggedUserData: any;
  constructor() {}

  ngOnInit(): void {
    const localData = localStorage.getItem('reqObj');
    this.loggedUserData = JSON.parse(localData);
  }
}
