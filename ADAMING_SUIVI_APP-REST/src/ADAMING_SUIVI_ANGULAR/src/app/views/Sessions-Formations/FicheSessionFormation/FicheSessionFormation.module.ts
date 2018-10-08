import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FicheSessionFormationComponent } from './FicheSessionFormation.component';
import { FicheSessionFormationRoutingModule } from './FicheSessionFormation-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  imports: [
    FormsModule,
    FicheSessionFormationRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
    CollapseModule.forRoot(),
  ],
  declarations: [  FicheSessionFormationComponent ]
})
export class FicheSessionFormationModule { }
