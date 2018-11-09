import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChargeRelance } from '../../models/ChargeRelance';
import { SessionReporting } from '../../models/SessionReporting';
import { SourceurTechnologies } from '../../models/SourceurTechnologies';
import { AccueilService } from '../../services/accueilService/accueil.service';
import { TechnologieService } from '../../services/administrationService/TechnologieService';
import { first } from 'rxjs/operators';
import { NAVIGATION_RULES } from '../../helper/application.constant';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ReportingChargeRelance= [];
  Sessionreporting= [];
  Sourceurtechnologies= [];
  pieChartLabels: string[]=[];
  pieChartData: number[] = [];
  pieChartType = 'pie';
  ChartColors : any[]=[
    {
      backgroundColor:["#FF7360","#6FC8CE","gray","#FFFCC4","#B9E8E0","#FFABF6","#01FBBA"]
    }
   ];
  constructor(
    private accueilService: AccueilService,
    private router:Router) {

     }

  ngOnInit() {
    this.loadReportingChargeRelance();
    this.loadSessionReporting();
    this.loadSourceurtechnologies();
    this.getChart();
  }

  private loadReportingChargeRelance() {
    this.accueilService.getNombreCVRrelancer().subscribe(result => { this.ReportingChargeRelance = result });
  }
  private loadSessionReporting() {
    this.accueilService.getSessionreporting().subscribe(result => { this.Sessionreporting = result });
  }
  private loadSourceurtechnologies() {
    this.accueilService.getSourceurTechnologies().subscribe(result => { this.Sourceurtechnologies = result });
  }

  private getChart(){
    this.accueilService.getChart().subscribe(result => { 
      this.pieChartData = Object.values(result);
      for(var i=0;i<Object.keys(result).length;i++){
        this.pieChartLabels[i]=Object.keys(result)[i];
      }
    });

  }
  openDetailsSession(session){
    this.router.navigate(["/"+NAVIGATION_RULES.dashboard.url+"/"+NAVIGATION_RULES.dashboard.ficheCandidatSession.replace(":id",session.idSession)])
  }

  openDetailsCVRelance(charge){
    this.router.navigate(["/"+NAVIGATION_RULES.dashboard.url+"/"+NAVIGATION_RULES.dashboard.ficheCvRelance.replace(":id",charge.idUser)])
  }
}
