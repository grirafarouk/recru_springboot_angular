import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { SessionsFormationsEncoursComponent } from './Sessions-Formations-Encours/SessionsFormationsEncours.component';
import { SessionsFormationsCloturesComponent } from './Sessions-Formations-Clotures/SessionsFormationsClotures.component';
import { FicheSessionFormationComponent } from './FicheSessionFormation/FicheSessionFormation.component';


const routes: Routes = [
  {
    path: '',
    component: SessionsFormationsEncoursComponent,
    data: {
      title: 'SessionsFormationsEncours'
    }
  },
  {
    path: 'SessionsFormationsClotures',
    component: SessionsFormationsCloturesComponent,
    data: {
      title: 'SessionsFormationsClotures'
    }
  },
  /*{
    path: 'ficheSessionFormation/:id',
    component: FicheSessionFormationComponent
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionFormationsRoutingModule {}
