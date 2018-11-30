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
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonCustomModule } from '../../common/common.module';
import { listSessionsFormationsAcceuilComponent } from './listSessionsFormationsAcceuil/listSessionsFormationsAcceuil.component';
import { listSessionsFormationsAcceuilRoutingModule } from './sessionsFormationsAcceuil-routing.module';
import { ficheSessionFormationAcceuilComponent } from './ficheSessionsFormationsAcceuil/ficheSessionsFormationsAcceuil.component';


@NgModule({
  imports: [
    FormsModule,
    listSessionsFormationsAcceuilRoutingModule,
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
    AlertModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    CommonCustomModule,
  ],
  declarations: [  listSessionsFormationsAcceuilComponent,ficheSessionFormationAcceuilComponent]
})
export class SessionsFormationsAcceuilModule { }
