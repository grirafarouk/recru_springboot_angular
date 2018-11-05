import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { competenceComponent } from './Competences/competence.component';
import { utilisateursComponent } from './Utilisateurs/utilisateurs.component';
import { lieuxComponent } from './Lieux/lieux.component';
import { origineCVComponent } from './OrigineCV/origineCV.component';
import { technologiesComponent } from './Technologies/technologies.component';
import { typeFormationComponent } from './TypeFormation/typeFormation.component';
import { clientSessionComponent } from './ClientSession/clientSession.component';
import { motifHorsCibleComponent } from './MotifHorsCible/motifHorsCible.component';
import { regionComponent } from './Region/region.component';
import { FiliereComponent } from './Filiere/filiere.component';
import { CanActivateService } from '../../helper/can-activate.service';


const routes: Routes = [
  {
    path: '',
    component: competenceComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'competences'
    }
  },
  {
    path: 'utilisateurs',
    component: utilisateursComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'utilisateurs'
    }
  },
  {
    path: 'lieux',
    component: lieuxComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'lieux'
    }
  },
  {
    path: 'origineCV',
    component: origineCVComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'origineCV'
  }
},
{
  path: 'technologies',
  canActivate:[CanActivateService],
  component: technologiesComponent,
  data: {
    title: 'technologie'
}
},
{
  path: 'typeFormation',
  canActivate:[CanActivateService],
  component: typeFormationComponent,
  data: {
    title: 'typeFormation'
}
},
{
  path: 'filiere',
  canActivate:[CanActivateService],
  component: FiliereComponent,
  data: {
    title: 'filiere'
}
},
{
  path: 'clientSession',
  canActivate:[CanActivateService],
  component: clientSessionComponent,
  data: {
    title: 'clientSession'
}

},
{
  path: 'motifHorsCible',
  component: motifHorsCibleComponent,
  canActivate:[CanActivateService],
  data: {
    title: 'motifHorsCible'
}

},
{
  path: 'region',
  canActivate:[CanActivateService],
  component: regionComponent,
  data: {
    title: 'region'
}

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class administrationRoutingModule {}
