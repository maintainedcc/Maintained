import { Component, OnInit } from '@angular/core';

import { Project } from '../core/schemas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firstTime: boolean = false;
  projects: Project[] = [];

  constructor() { }

  ngOnInit(): void {
    // Build dashboard using fetched user data
    fetch("/api/user/data")
    .then(res => res.text())
    .then(res => {
      const data = JSON.parse(res);
      console.log(data);
      this.projects = data.projects;
      this.firstTime = data.firstTime;
    });
  }

  hideWelcome(): void {
    this.firstTime = false;
  }

}
