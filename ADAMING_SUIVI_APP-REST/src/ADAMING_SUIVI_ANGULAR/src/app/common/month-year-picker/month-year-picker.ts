import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeFormats } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;
export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: 'MM/YYYY',
  fullPickerInput: 'l LT',
  datePickerInput: 'MM/YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
import {
  FormControl,
} from '@angular/forms';


@Component({
  selector: 'month-year-picker',
  template: `
  <input [owlDateTimeTrigger]="dtdateObtentionDiplome"
  [owlDateTime]="dtdateObtentionDiplome" class="form-control" name="dateObtentionDiplome" 
    [formControl]="dateTime" id="dateObtentionDiplome">

<owl-date-time [pickerType]="'calendar'"
[startView]="'multi-years'" [disabled]="_disabled"
(yearSelected)="chosenYearHandler($event)"
(monthSelected)="chosenMonthHandler($event, dtdateObtentionDiplome)"
#dtdateObtentionDiplome="owlDateTime"></owl-date-time>
  `,
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],

})
export class MonthYeatPickerComponent implements OnInit {
  ngOnInit(): void {
    if (this.innerValue != undefined) this.dateTime = new FormControl(moment(this.innerValue))
    
  }
  @Input()
  private innerValue: Date;

  private  _disabled: boolean;

  get disabled(): boolean {
    // transform value for display
    return this._disabled
  }
  
  @Input()
  set disabled(disabled: boolean) {
    disabled ? this.dateTime.disable() : this.dateTime.enable();
    this._disabled = disabled;
  }


  @Output() changed = new EventEmitter<Date>();


  public dateTime = new FormControl(moment(null));
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateTime.value;
    ctrlValue.year(normalizedYear.year());
    this.dateTime.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.dateTime.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateTime.setValue(ctrlValue);
    this.changed.emit(ctrlValue.toDate())
    datepicker.close();
  }



}