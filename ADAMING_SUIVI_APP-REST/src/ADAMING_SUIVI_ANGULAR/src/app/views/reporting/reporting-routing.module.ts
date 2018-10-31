import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { ReportingSourceurComponent } from './reportingSourceur/reportingSourceur.component';
import { ListeReportingComponent } from './listeReporting/listeReporting.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {}
