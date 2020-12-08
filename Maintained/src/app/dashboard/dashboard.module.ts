import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BadgeEditorComponent } from './project/badge-editor/badge-editor.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectDeleteComponent } from './project/project-delete/project-delete.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ProjectComponent,
    WelcomeComponent,
    BadgeEditorComponent, ProjectCreateComponent, ProjectDeleteComponent
  ],
  imports: [CommonModule, SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
