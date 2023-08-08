import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/pages/login/login.component';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import { HomePageComponent } from './Views/pages/home-page/home-page.component';
// import { RaiseTicketComponent } from './Views/pages/raise-ticket/raise-ticket.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./Views/layout/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    component: DashboardComponent,
  },
  {
    path: 'home',
    component:HomePageComponent,
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
