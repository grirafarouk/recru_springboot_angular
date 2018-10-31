import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { MonthYeatPickerComponent } from './month-year-picker/month-year-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  imports: [
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule
  ],
  declarations: [ RatingComponent,MonthYeatPickerComponent  ],
  exports: [
    RatingComponent,MonthYeatPickerComponent
  ]
})
export class CommonCustomModule { }
