import { Injectable } from '@angular/core';

import { Project } from '../../schemas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async createProject(name: string): Promise<Project> {
    return await fetch(`/api/projects/create?project=${name}`)
      .then(res => res.text())
      .then(res => {
        res = JSON.parse(res);
        return <unknown>res as Project;
      });
  }

  async deleteProject(name: string): Promise<void> {
    fetch(`/api/projects/delete?project=${name}`)
    .catch(ex => {
      console.error(ex);
    });
  }
}
