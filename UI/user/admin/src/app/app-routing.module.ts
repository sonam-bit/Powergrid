import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login/login.component';
import { AdminHomeComponent } from './views/admin-home/admin-home.component';
import { authguardGuard } from './guard/authguard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full',
    
  },
  {
    path:'login',
    component: LoginComponent,
  }
  ,
  {
    path:'adminHome',
    component: AdminHomeComponent,
    canActivate: [authguardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
