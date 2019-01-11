import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { SessionsFormationsEncoursComponent } from './Sessions-Formations-Encours/SessionsFormationsEncours.component';
import { SessionsFormationsCloturesComponent } from './Sessions-Formations-Clotures/SessionsFormationsClotures.component';
import { FicheSessionFormationComponent } from './FicheSessionFormation/FicheSessionFormation.component';
import { CanActivateService } from '../../helper/can-activate.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { SessionFormationDetailResolve } from './SessionFormationDetailResolve';


const routes: Routes = [
  {
    path: NAVIGATION_RULES.sessionsFormations.enCours,
    component: SessionsFormationsEncoursComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'SessionsFormationsEncours'
    }
  },
  {
    path: NAVIGATION_RULES.sessionsFormations.clotures,
    component: SessionsFormationsCloturesComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'SessionsFormationsClotures'
    }
  },
  {
    path: NAVIGATION_RULES.sessionsFormations.details,
    component: FicheSessionFormationComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Sessions Formations /'
    }, resolve: {
      session: SessionFormationDetailResolve
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionFormationsRoutingModule { }
