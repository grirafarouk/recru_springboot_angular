import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { MonthYeatPickerComponent } from './month-year-picker/month-year-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RatingDisabledComponent } from './rating-disabled/rating-disabled.component';
import { CandidatsDetailsModalComponent } from './candidats-details-modal/candidats-details-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CustomLocalTableComponent } from './local-table/local-table.component';
import { BooleanPipe } from '../views/pipe/boolean.pipe';
import { MonthDatePickerComponent } from './month-date-picker/month-date-picker.component';


@NgModule({
  imports: [
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    CommonModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    BsDropdownModule,
    TooltipModule.forRoot()
  ],
  declarations: [ BooleanPipe,CustomLocalTableComponent,RatingComponent,MonthYeatPickerComponent ,RatingDisabledComponent ,CandidatsDetailsModalComponent,CustomTableComponent],
  exports: [
    BooleanPipe,
    CustomLocalTableComponent, RatingComponent,MonthYeatPickerComponent,RatingDisabledComponent,CandidatsDetailsModalComponent,CustomTableComponent 
  ]
})
export class CommonCustomModule { }
