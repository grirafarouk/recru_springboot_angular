import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { reportingSourceurComponent } from './reportingSourceur.component';


const routes: Routes = [
  {
    path: '',
    component: reportingSourceurComponent,
    data: {
      title: 'reportingSourceur'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reportingSourceurRoutingModule {}
