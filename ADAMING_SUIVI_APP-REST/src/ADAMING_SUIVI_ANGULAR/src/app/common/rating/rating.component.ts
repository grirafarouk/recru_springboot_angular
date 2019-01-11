import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() name: string;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.name + '_rating'+Math.random().toString(36).substring(7);
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
        name: this.name,
      rating: rating
    });
  }
}