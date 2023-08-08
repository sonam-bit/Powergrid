import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guard/auth.guard';
// import { RaiseTicketComponent } from '../../pages/raise-ticket/raise-ticket.component';

const routes: Routes= [
  {
    path: 'raiseTicket',
    loadChildren: () =>
    import('../../pages/raise-ticket/raise-ticket-routing.module').then((m) => m.RaiseTicketRoutingModule),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadChildren:()=>
    import('../../pages/home-page/home-page-routing.module').then((m)=> m.HomePageRoutingModule),
    canActivate: [authGuard],
  },
  {
    path: 'historyTicket',
    loadChildren:()=>
    import('../../pages/history/history-routing.module').then((m)=>m.HistoryRoutingModule),
    canActivate: [authGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
