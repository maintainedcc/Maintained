import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import routes from page modules
import { HomeRoutingModule } from './home/home-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { PrivacyRoutingModule } from './privacy/privacy-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  /*{
    path: '**',
    component: PageNotFoundComponent
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DashboardRoutingModule,
    PrivacyRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
