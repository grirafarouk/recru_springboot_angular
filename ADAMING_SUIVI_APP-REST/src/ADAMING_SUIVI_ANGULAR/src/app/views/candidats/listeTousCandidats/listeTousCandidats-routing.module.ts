import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { listeTousCandidatsComponent } from './listeTousCandidats.component';


const routes: Routes = [
  {
    path: '',
    component: listeTousCandidatsComponent,
    data: {
      title: 'listeTousCandidats'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class listeTousCandidatsRoutingModule {}
