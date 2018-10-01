import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeCandidatArelancerComponent } from './listeCandidatArelancer.component';


const routes: Routes = [
  {
    path: '',
    component: listeCandidatArelancerComponent,
    data: {
      title: 'listeNouveauxCandidats'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeCandidatArelancerRoutingModule {}
