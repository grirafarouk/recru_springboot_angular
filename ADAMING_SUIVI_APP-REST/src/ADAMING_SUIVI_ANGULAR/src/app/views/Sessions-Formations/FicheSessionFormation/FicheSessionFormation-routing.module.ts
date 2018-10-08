import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { FicheSessionFormationComponent } from './FicheSessionFormation.component';


const routes: Routes = [
  {
    path: '',
    component: FicheSessionFormationComponent,
    data: {
      title: 'FicheSessionFormation'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheSessionFormationRoutingModule {}
