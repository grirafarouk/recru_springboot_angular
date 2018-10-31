import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { ReportingSourceurComponent } from './reportingSourceur/reportingSourceur.component';
import { ListeReportingComponent } from './listeReporting/listeReporting.component';
import { FicheReportingComponent } from './ficher-reporting/fiche-reporting.component';
import { CandidatDetailResolve } from '../candidats/fiche-candidat/CandidatDetailResolve';


const routes: Routes = [
  {
    path: 'reportingSourceur',
    component: ReportingSourceurComponent,
    data: {
      title: 'Reporting Sourceur'
    }
  },
  {
    path: 'listeReporting',
    component: ListeReportingComponent,
    data: {
      title: 'Liste Reporting'
    }
  },
  {
    path: 'details/:id',
    component: FicheReportingComponent,
    data: {
      title: 'Reporting / '
    }  ,resolve: {
      candidat: CandidatDetailResolve 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {}
