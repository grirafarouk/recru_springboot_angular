import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { listeEntretienComponent } from './listeEntretien.component'
import { listeEntretienRoutingModule } from './listeEntretien-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



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

  ],
  declarations: [  listeEntretienComponent ]
})
export class listeEntretienModule { }
