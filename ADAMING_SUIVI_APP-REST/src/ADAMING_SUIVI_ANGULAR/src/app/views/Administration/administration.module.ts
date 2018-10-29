import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { administrationRoutingModule } from './administration-routing.module';
import { competenceComponent } from './Competences/competence.component';
import { utilisateursComponent } from './Utilisateurs/utilisateurs.component';
import { lieuxComponent } from './Lieux/lieux.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { origineCVComponent } from './OrigineCV/origineCV.component';
import { technologiesComponent } from './Technologies/technologies.component';
import { typeFormationComponent } from './TypeFormation/typeFormation.component';
import { clientSessionComponent } from './ClientSession/clientSession.component';
import { motifHorsCibleComponent } from './MotifHorsCible/motifHorsCible.component';
import { regionComponent } from './Region/region.component';
import { BooleanPipe } from '../pipe/boolean.pipe';



@NgModule({
  imports: [
    FormsModule,
    administrationRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    TextMaskModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
    


  ],
  declarations: [  competenceComponent,utilisateursComponent,lieuxComponent,
    origineCVComponent,technologiesComponent,typeFormationComponent,clientSessionComponent,
  motifHorsCibleComponent,regionComponent,BooleanPipe]
})
export class administrationModule { }
