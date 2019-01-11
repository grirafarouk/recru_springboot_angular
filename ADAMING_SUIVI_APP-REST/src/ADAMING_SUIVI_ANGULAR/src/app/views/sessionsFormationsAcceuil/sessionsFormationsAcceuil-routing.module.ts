import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { CandidatDetailResolve } from '../candidats/fiche-candidat/CandidatDetailResolve';
//import { FicheEntrtienComponent } from './ficher-entretien/fiche-entrtien.component';
import { CanActivateService } from '../../helper/can-activate.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { listSessionsFormationsAcceuilComponent } from './listSessionsFormationsAcceuil/listSessionsFormationsAcceuil.component';
import { FicheSessionFormationComponent } from '../Sessions-Formations/FicheSessionFormation/FicheSessionFormation.component';
import { ficheSessionFormationAcceuilComponent } from './ficheSessionsFormationsAcceuil/ficheSessionsFormationsAcceuil.component';


const routes: Routes = [
  {
    path: NAVIGATION_RULES.sessionsFormationsAcceuil.listAcceuil,
    component: listSessionsFormationsAcceuilComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'sessionsFormations'
    }
  },
  {
    path: NAVIGATION_RULES.sessionsFormationsAcceuil.details,
    component: ficheSessionFormationAcceuilComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'sessionsFormations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listSessionsFormationsAcceuilRoutingModule {}
