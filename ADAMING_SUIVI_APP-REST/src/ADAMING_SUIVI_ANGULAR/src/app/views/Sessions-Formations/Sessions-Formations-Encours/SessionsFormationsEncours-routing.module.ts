import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { SessionsFormationsEncoursComponent } from './SessionsFormationsEncours.component';


const routes: Routes = [
  {
    path: '',
    component: SessionsFormationsEncoursComponent,
    data: {
      title: 'Candidats'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsFormationsEncoursRoutingModule {}
