import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { listeNouveauxCandidatsComponent } from './listeNouveauxCandidats.component'
import { listeNouveauxCandidatsRoutingModule } from './listeNouveauxCandidats-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';




@NgModule({
  imports: [
    FormsModule,
    listeNouveauxCandidatsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    TextMaskModule

  ],
  declarations: [  listeNouveauxCandidatsComponent ]
})
export class listeNouveauxCandidatsModule { }
