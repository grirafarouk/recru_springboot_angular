import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeEntretienComponent } from './listeEntretien.component';
import { CandidatDetailResolve } from '../fiche-candidat/CandidatDetailResolve';
import { FicheEntrtienComponent } from './ficher-entretien/fiche-entrtien.component';


const routes: Routes = [
  {
    path: '',
    component: listeEntretienComponent,
    data: {
      title: 'listeEntretien'
    }
  },
  {
    path: 'details/:id',
    component: FicheEntrtienComponent,
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
