import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CanActivateService } from '../../helper/can-activate.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
