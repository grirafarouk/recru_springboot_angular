import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CandidatsComponent } from './candidats/candidats.component';
import { CandidatsRoutingModule } from './candidats-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { FicheCandidatComponent } from './fiche-candidat/fiche-candidat.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { listeNouveauxCandidatsComponent } from './listeNouveauxCandidats/listeNouveauxCandidats.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { listeTousCandidatsComponent } from './listeTousCandidats/listeTousCandidats.component';
import { listeCandidatArelancerComponent } from './listeCandidatArelancer/listeCandidatArelancer.component';
import { CommonCustomModule } from '../../common/common.module';

@NgModule({
  imports: [
    FormsModule,
    CandidatsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    TextMaskModule,
    NgxLoadingModule.forRoot({}),
    CommonCustomModule
  ],
  declarations: [
    listeCandidatArelancerComponent,
    listeTousCandidatsComponent,
    listeNouveauxCandidatsComponent,
    CandidatsComponent,
    FicheCandidatComponent,
  ]
})
export class CandidatsModule { }
