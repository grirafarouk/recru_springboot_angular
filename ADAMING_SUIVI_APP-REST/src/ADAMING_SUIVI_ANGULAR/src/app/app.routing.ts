import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './services/AuthGuard.service';
import { ficheCvRelanceComponent } from './views/dashboard/ficheCvRelance/ficheCvRelance.component';
import { ficheCandidatSessionComponent } from './views/dashboard/ficheCandidatSession/ficheCandidatSession.component';
import { FicheSessionFormationComponent } from './views/Sessions-Formations/FicheSessionFormation/FicheSessionFormation.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { 
    path: 'ficheCVRelance/:idUser', 
    component: ficheCvRelanceComponent 
  },
  {
    path: 'ficheCandidatSession/:idSession',
    component: ficheCandidatSessionComponent
  },
  {
    path: 'ficheSessionFormation/:id',
    component: FicheSessionFormationComponent
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[AuthGuard],
    children: [
      {
      path: 'candidats',
      loadChildren: './views/candidats/candidats.module#CandidatsModule'
      },
      {
        path: 'listeEntretien',
        loadChildren: './views/candidats/listeEntretien/listeEntretien.module#listeEntretienModule'
      },
      {
        path: 'SessionsFormations',
        loadChildren: './views/Sessions-Formations/sessionFormations.module#SessionFormationsModule'
      },
      {
        path: 'listeReporting',
        loadChildren: './views/candidats/listeReporting/listeReporting.module#listeReportingModule'
      },
      {
        path: 'reportingSourceur',
        loadChildren: './views/candidats/reportingSourceur/reportingSourceur.module#reportingSourceurModule'
      },
      {
        path: 'administration',
        loadChildren: './views/Administration/administration.module#administrationModule'
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}