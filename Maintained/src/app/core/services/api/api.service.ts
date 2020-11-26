import { Injectable } from '@angular/core';

import { Project } from '../../schemas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // API SECTION: USER MANAGEMENT
  async setUserWelcomed(): Promise<void> {
    fetch('/api/user/welcome', { method: 'POST' });
  }

  // API SECTION: PROJECT MANAGEMENT
  async createProject(name: string): Promise<Project | void> {
    return await fetch(`/api/projects/create?project=${name}`)
      .then(res => res.text())
      .then(res => {
        res = JSON.parse(res);
        return res as unknown as Project;
      })
      .catch(ex => {
        console.error(ex);
      });
  }

  async deleteProject(name: string): Promise<void> {
    fetch(`/api/projects/delete?project=${name}`)
    .catch(ex => {
      console.error(ex);
    });
  }
}
