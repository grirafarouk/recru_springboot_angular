import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeEntretienComponent } from './listeEntretien/listeEntretien.component';
import { CandidatDetailResolve } from '../candidats/fiche-candidat/CandidatDetailResolve';
import { FicheEntrtienComponent } from './ficher-entretien/fiche-entrtien.component';
import { CanActivateService } from '../../helper/can-activate.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';


const routes: Routes = [
  {
    path: NAVIGATION_RULES.entretien.list,
    component: listeEntretienComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'Liste Entretien'
    }
  },
  {
    path: NAVIGATION_RULES.entretien.details,
    component: FicheEntrtienComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'Entrtiens / '
    }  ,resolve: {
      candidat: CandidatDetailResolve 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeEntretienRoutingModule {}
