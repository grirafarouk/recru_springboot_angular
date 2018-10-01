import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeNouveauxCandidatsComponent } from './listeNouveauxCandidats.component';


const routes: Routes = [
  {
    path: '',
    component: listeNouveauxCandidatsComponent,
    data: {
      title: 'listeNouveauxCandidats'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeNouveauxCandidatsRoutingModule {}
