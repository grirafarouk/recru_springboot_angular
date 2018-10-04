import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CandidatsComponent } from './candidats.component';
import { CandidatsRoutingModule } from './candidats-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxMaskModule} from 'ngx-mask';
import { FicheCandidatComponent } from './fiche-candidat/fiche-candidat.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MonthYeatPickerComponent } from '../../helper/month-year-picker';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    FormsModule,
    CandidatsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    NgSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxSpinnerModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),

  ],
  declarations: [  CandidatsComponent, FicheCandidatComponent,MonthYeatPickerComponent ]
})
export class CandidatsModule { }
