import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingSourceurComponent } from './reportingSourceur/reportingSourceur.component';
import { ListeReportingComponent } from './listeReporting/listeReporting.component';
import { FicheReportingComponent } from './ficher-reporting/fiche-reporting.component';
import { CommonCustomModule } from '../../common/common.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    FormsModule,
    ReportingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    TextMaskModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    ModalModule.forRoot(),
    CommonCustomModule,
    NgxLoadingModule.forRoot({}),

  ],
  declarations: [ReportingSourceurComponent,ListeReportingComponent,FicheReportingComponent    ]
})
export class ReportingModule { }
