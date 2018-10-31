import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { MonthYeatPickerComponent } from './month-year-picker/month-year-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RatingDisabledComponent } from './rating-disabled/rating-disabled.component';


@NgModule({
  imports: [
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule
  ],
  declarations: [ RatingComponent,MonthYeatPickerComponent ,RatingDisabledComponent ],
  exports: [
    RatingComponent,MonthYeatPickerComponent,RatingDisabledComponent
  ]
})
export class CommonCustomModule { }
