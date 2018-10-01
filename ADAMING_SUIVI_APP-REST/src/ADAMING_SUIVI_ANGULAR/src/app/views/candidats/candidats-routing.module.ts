import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { CandidatsComponent } from './candidats.component';
import { CandidatDetailResolve } from './fiche-candidat/CandidatDetailResolve';
import { FicheCandidatComponent } from './fiche-candidat/fiche-candidat.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule {}
