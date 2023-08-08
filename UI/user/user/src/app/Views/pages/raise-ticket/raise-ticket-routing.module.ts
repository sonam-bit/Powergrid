import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaiseTicketComponent } from './raise-ticket.component';
import { authGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RaiseTicketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseTicketRoutingModule { }
