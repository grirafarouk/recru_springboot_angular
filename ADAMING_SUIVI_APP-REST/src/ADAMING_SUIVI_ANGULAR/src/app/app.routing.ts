import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/security/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './services/AuthGuard.service';
import { ficheCvRelanceComponent } from './views/dashboard/ficheCvRelance/ficheCvRelance.component';
import { NAVIGATION_RULES } from './helper/application.constant';
import { ForgetPwdComponent } from './views/security/forget-password/forget-pwd.component';
import { RestPwdComponent } from './views/security/reset-pwd/reset-pwd.component';
import { TokenResolve } from './views/security/TokenResolve';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
    path: NAVIGATION_RULES.login.url,
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: NAVIGATION_RULES.forgetpwd.url,
    component: ForgetPwdComponent,
    data: {
      title: 'Password Forget'
    }
  },
  {
    path: NAVIGATION_RULES.restpwd.url,
    component: RestPwdComponent,
    data: {
      title: 'Password Forget'
    },
    resolve : [TokenResolve]
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
      path:  NAVIGATION_RULES.candidats.url,
      loadChildren: './views/candidats/candidats.module#CandidatsModule',
    },
      {
        path: NAVIGATION_RULES.entretien.url,
        loadChildren: './views/entretien/entretien.module#EntretienModule'
      },
      {
        path:  NAVIGATION_RULES.sessionsFormations.url,
        loadChildren: './views/Sessions-Formations/sessionFormations.module#SessionFormationsModule'
      },   
      {
        path: NAVIGATION_RULES.reporting.url,
        loadChildren: './views/reporting/reporting.module#ReportingModule'
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