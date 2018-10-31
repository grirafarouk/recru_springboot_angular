import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-disabled',
  templateUrl: './rating-disabled.component.html',
  styleUrls: ['./rating-disabled.component.css']
})
export class RatingDisabledComponent implements OnInit {
  @Input() rating: number;
  @Input() name: string;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.name + '_rating';
  }

}