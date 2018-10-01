import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { listeTousCandidatsComponent } from './listeTousCandidats.component'
import { listeTousCandidatsRoutingModule } from './listeTousCandidats-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    FormsModule,
    listeTousCandidatsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    NgxPaginationModule,
  ],
  declarations: [  listeTousCandidatsComponent ]
})
export class listeTousCandidatsModule { }
