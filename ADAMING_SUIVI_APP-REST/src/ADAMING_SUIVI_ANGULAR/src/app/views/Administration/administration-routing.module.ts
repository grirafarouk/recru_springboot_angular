import { StatusComponent } from './status/status.component';
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
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { RoleComponent } from './role/role.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';



const routes: Routes = [
  {
    path: NAVIGATION_RULES.administration.competences,
    component: competenceComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'competences'
    }
  },
  {
    path: NAVIGATION_RULES.administration.role,
    component: RoleComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'role'
    }
  },
  {
    path: NAVIGATION_RULES.administration.status,
    component: StatusComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'status'
    }
  },
  {
    path: NAVIGATION_RULES.administration.disponible,
    component: DisponibiliteComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'disponible'
    }
  },
  {
    path: NAVIGATION_RULES.administration.utilisateurs,
    component: utilisateursComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'utilisateurs'
    }
  },
  {
    path: NAVIGATION_RULES.administration.lieux,
    component: lieuxComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'lieux'
    }
  },
  {
    path:NAVIGATION_RULES.administration.origineCV,
    component: origineCVComponent,
    canActivate:[CanActivateService],
    data: {
      title: 'origineCV'
  }
},
{
  path: NAVIGATION_RULES.administration.technologies,
  canActivate:[CanActivateService],
  component: technologiesComponent,
  data: {
    title: 'technologie'
}
},
{
  path: NAVIGATION_RULES.administration.typeFormation,
  canActivate:[CanActivateService],
  component: typeFormationComponent,
  data: {
    title: 'typeFormation'
}
},
{
  path: NAVIGATION_RULES.administration.filiere,
  canActivate:[CanActivateService],
  component: FiliereComponent,
  data: {
    title: 'filiere'
}
},
{
  path: NAVIGATION_RULES.administration.clientSession,
  canActivate:[CanActivateService],
  component: clientSessionComponent,
  data: {
    title: 'clientSession'
}

},
{
  path: NAVIGATION_RULES.administration.motifHorsCible,
  component: motifHorsCibleComponent,
  canActivate:[CanActivateService],
  data: {
    title: 'motifHorsCible'
}

},
{
  path: NAVIGATION_RULES.administration.region,
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
