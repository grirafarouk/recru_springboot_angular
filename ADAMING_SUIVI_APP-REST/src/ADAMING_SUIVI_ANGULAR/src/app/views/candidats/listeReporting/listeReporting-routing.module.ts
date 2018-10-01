import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeReportingComponent } from './listeReporting.component';


const routes: Routes = [
  {
    path: '',
    component: listeReportingComponent,
    data: {
      title: 'listeReporting'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeReportingRoutingModule {}
