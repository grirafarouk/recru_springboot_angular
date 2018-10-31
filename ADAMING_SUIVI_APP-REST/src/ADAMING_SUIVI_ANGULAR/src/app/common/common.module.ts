import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';


@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [ RatingComponent  ],
  exports: [
    RatingComponent
  ]
})
export class CommonCustomModule { }
