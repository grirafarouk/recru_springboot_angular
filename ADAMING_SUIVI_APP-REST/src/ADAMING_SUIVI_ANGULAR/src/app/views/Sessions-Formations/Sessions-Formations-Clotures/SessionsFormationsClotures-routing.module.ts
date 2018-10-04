import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { SessionsFormationsCloturesComponent } from './SessionsFormationsClotures.component';


const routes: Routes = [
  {
    path: '',
    component: SessionsFormationsCloturesComponent,
    data: {
      title: 'SessionsFormationsClotures'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsFormationsCloturesRoutingModule {}
