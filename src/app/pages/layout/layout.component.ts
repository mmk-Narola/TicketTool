import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loggedUserData: any;
  constructor() {}

  ngOnInit(): void {
    const localData = localStorage.getItem('reqObj');
    this.loggedUserData = JSON.parse(localData);
  }
}
