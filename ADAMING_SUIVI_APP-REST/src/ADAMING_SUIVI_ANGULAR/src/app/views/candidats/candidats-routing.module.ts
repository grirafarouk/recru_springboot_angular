import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { CandidatsComponent } from './candidats/candidats.component';
import { CandidatDetailResolve } from './fiche-candidat/CandidatDetailResolve';
import { FicheCandidatComponent } from './fiche-candidat/fiche-candidat.component';
import { listeNouveauxCandidatsComponent } from './listeNouveauxCandidats/listeNouveauxCandidats.component';
import { listeTousCandidatsComponent } from './listeTousCandidats/listeTousCandidats.component';
import { listeCandidatArelancerComponent } from './listeCandidatArelancer/listeCandidatArelancer.component';
import { CanActivateService } from '../../helper/can-activate.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';


const routes: Routes = [
  {
    path: NAVIGATION_RULES.candidats.newCancidat,
    component: CandidatsComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Candidats'
    }
  },
  {
    path: 'details/:id',
    component: FicheCandidatComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'Candidats / '
    },
    resolve: {
      candidat: CandidatDetailResolve
    },
  },
  {
    path: NAVIGATION_RULES.candidats.listeNouveauxCandidats,
    component: listeNouveauxCandidatsComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'listeNouveauxCandidats'
    }
  },
  {
    path:NAVIGATION_RULES.candidats.listeTousCandidats,
    canActivate: [CanActivateService],
    component: listeTousCandidatsComponent,
    data: {
      title: 'listeTousCandidats'
    }
  },
  {
    path:NAVIGATION_RULES.candidats.listeCandidatArelancer,
    canActivate: [CanActivateService],
    component: listeCandidatArelancerComponent,
    data: {
      title: 'listeCandidatArelancer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }
