import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { listeEntretienComponent } from './listeEntretien/listeEntretien.component'
import { listeEntretienRoutingModule } from './entretien-routing.module';
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
import { FicheEntrtienComponent } from './ficher-entretien/fiche-entrtien.component';


@NgModule({
  imports: [
    FormsModule,
    listeEntretienRoutingModule,
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
  declarations: [  listeEntretienComponent ,FicheEntrtienComponent]
})
export class EntretienModule { }
