import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SessionsFormationsCloturesComponent } from './SessionsFormationsClotures.component';
import { SessionsFormationsCloturesRoutingModule } from './SessionsFormationsClotures-routing.module';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular';


@NgModule({
  imports: [
    FormsModule,
    SessionsFormationsCloturesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DxTreeViewModule,
    CommonModule ,
  ],
  declarations: [  SessionsFormationsCloturesComponent ]
})
export class SessionsFormationsCloturesModule { }
