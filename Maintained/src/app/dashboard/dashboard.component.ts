import { Component, OnInit } from '@angular/core';

import { ApiService } from '../core/services';
import { Project } from '../core/schemas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firstTime: boolean = false;
  projects: Project[] = [];
  userId: string = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // Build dashboard using fetched user data
    fetch("/api/user/data")
    .then(res => res.text())
    .then(res => {
      const data = JSON.parse(res);
      this.userId = data.name;
      this.projects = data.projects;
      this.firstTime = data.firstTime;
    });
  }

  hideWelcome(): void {
    this.firstTime = false;
  }

  async createProject(): Promise<void> {
    let newProject = await this.api.createProject("New Project");
    this.projects.push(newProject);
  }

  deleteProject(name: string): void {
    // Delete project from backend
    this.api.deleteProject(name);
    // Removes project from local array
    this.projects.splice(this.projects.findIndex(p => p.title === name), 1);
    console.log("Deleted project "+name);
  }

}
