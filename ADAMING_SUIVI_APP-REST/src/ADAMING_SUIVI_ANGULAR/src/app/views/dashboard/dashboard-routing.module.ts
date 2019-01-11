import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CanActivateService } from '../../helper/can-activate.service';
import { ficheCandidatSessionComponent } from './ficheCandidatSession/ficheCandidatSession.component';
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { ficheCvRelanceComponent } from './ficheCvRelance/ficheCvRelance.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: NAVIGATION_RULES.dashboard.ficheCandidatSession,
    component: ficheCandidatSessionComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: NAVIGATION_RULES.dashboard.ficheCvRelance,
    component: ficheCvRelanceComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
