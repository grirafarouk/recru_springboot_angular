import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { SessionsFormationsEncoursComponent } from './SessionsFormationsEncours.component';
import { FicheSessionFormationComponent } from '../FicheSessionFormation/FicheSessionFormation.component';


const routes: Routes = [
  {
    path: '',
    component: SessionsFormationsEncoursComponent,
    data: {
      title: 'SessionsFormationsEncours'
    }
  },
  {
    path: 'ficheSessionFormation/:id',
    component: FicheSessionFormationComponent,
   
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsFormationsEncoursRoutingModule {}
