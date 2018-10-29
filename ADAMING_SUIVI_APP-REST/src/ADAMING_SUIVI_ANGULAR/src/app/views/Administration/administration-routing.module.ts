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


const routes: Routes = [
  {
    path: '',
    component: competenceComponent,
    data: {
      title: 'competences'
    }
  },
  {
    path: 'utilisateurs',
    component: utilisateursComponent,
    data: {
      title: 'utilisateurs'
    }
  },
  {
    path: 'lieux',
    component: lieuxComponent,
    data: {
      title: 'lieux'
    }
  },
  {
    path: 'origineCV',
    component: origineCVComponent,
    data: {
      title: 'origineCV'
  }
},
{
  path: 'technologies',
  component: technologiesComponent,
  data: {
    title: 'technologie'
}
},
{
  path: 'typeFormation',
  component: typeFormationComponent,
  data: {
    title: 'typeFormation'
}
},
{
  path: 'clientSession',
  component: clientSessionComponent,
  data: {
    title: 'clientSession'
}

},
{
  path: 'motifHorsCible',
  component: motifHorsCibleComponent,
  data: {
    title: 'motifHorsCible'
}

},
{
  path: 'region',
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
