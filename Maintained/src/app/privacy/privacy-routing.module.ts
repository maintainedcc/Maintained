import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy.component';

const routes: Routes = [
  {
    path: 'privacy',
    component: PrivacyComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule {}
