import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { SessionsFormationsEncoursComponent } from './Sessions-Formations-Encours/SessionsFormationsEncours.component';
import { SessionsFormationsCloturesComponent } from './Sessions-Formations-Clotures/SessionsFormationsClotures.component';
import { AccordionModule } from 'ngx-accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SessionFormationsRoutingModule } from './sessionFormations-routing.module';
import { FicheSessionFormationComponent } from './FicheSessionFormation/FicheSessionFormation.component';

@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    AccordionModule,
    CollapseModule.forRoot(),
    SessionFormationsRoutingModule
  ],
  declarations: [
    SessionsFormationsEncoursComponent,
    SessionsFormationsCloturesComponent,
    FicheSessionFormationComponent
  ]
})
export class SessionFormationsModule { }
