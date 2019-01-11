import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {CommonModule} from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ficheCandidatSessionComponent } from './ficheCandidatSession/ficheCandidatSession.component';
import { ficheCvRelanceComponent } from './ficheCvRelance/ficheCvRelance.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent,ficheCandidatSessionComponent ,ficheCvRelanceComponent]
})
export class DashboardModule { }
