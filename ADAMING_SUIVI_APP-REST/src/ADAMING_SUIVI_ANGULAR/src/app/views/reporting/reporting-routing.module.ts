import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { ReportingSourceurComponent } from './reportingSourceur/reportingSourceur.component';
import { ListeReportingComponent } from './listeReporting/listeReporting.component';
import { FicheReportingComponent } from './ficher-reporting/fiche-reporting.component';
import { CandidatDetailResolve } from '../candidats/fiche-candidat/CandidatDetailResolve';
import { CanActivateService } from '../../helper/can-activate.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';


const routes: Routes = [
  {
    path: NAVIGATION_RULES.reporting.reportingSourceur,
    component: ReportingSourceurComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Reporting Sourceur'
    }
  },
  {
    path: NAVIGATION_RULES.reporting.listeReporting,
    component: ListeReportingComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Liste Reporting'
    }
  },
  {
    path: NAVIGATION_RULES.reporting.details,
    component: FicheReportingComponent,
    data: {
      canActivate: [CanActivateService],
      title: 'Reporting / '
    }, resolve: {
      candidat: CandidatDetailResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
