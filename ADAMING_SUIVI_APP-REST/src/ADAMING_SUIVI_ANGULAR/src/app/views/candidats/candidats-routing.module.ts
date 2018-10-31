import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { CandidatsComponent } from './candidats/candidats.component';
import { CandidatDetailResolve } from './fiche-candidat/CandidatDetailResolve';
import { FicheCandidatComponent } from './fiche-candidat/fiche-candidat.component';
import { listeNouveauxCandidatsComponent } from './listeNouveauxCandidats/listeNouveauxCandidats.component';
import { listeTousCandidatsComponent } from './listeTousCandidats/listeTousCandidats.component';
import { listeCandidatArelancerComponent } from './listeCandidatArelancer/listeCandidatArelancer.component';


const routes: Routes = [
  {
    path: '',
    component: CandidatsComponent,
    data: {
      title: 'Candidats'
    }
  },
  
    {
      path: 'details/:id',
      component: FicheCandidatComponent,
      data: {
        title: 'Candidats / '
      },
      resolve: {
        candidat: CandidatDetailResolve 
      },
  },
  {
    path: 'listeNouveauxCandidats',
    component: listeNouveauxCandidatsComponent,
    data: {
      title: 'listeNouveauxCandidats'
    }
  },
  {
    path: 'listeTousCandidats',
    component: listeTousCandidatsComponent,
    data: {
      title: 'listeTousCandidats'
    }
  },
  {
    path: 'listeCandidatArelancer',
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
export class CandidatsRoutingModule {}
