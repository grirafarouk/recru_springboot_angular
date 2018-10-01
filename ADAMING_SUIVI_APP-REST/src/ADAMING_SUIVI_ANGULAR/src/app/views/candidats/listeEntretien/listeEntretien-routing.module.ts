import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeEntretienComponent } from './listeEntretien.component';


const routes: Routes = [
  {
    path: '',
    component: listeEntretienComponent,
    data: {
      title: 'listeEntretien'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeEntretienRoutingModule {}
