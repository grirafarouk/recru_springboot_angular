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
import { NotifierService } from 'angular-notifier';
import { HelperService } from '../../helper/helper.service';

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
   pages = [];
   size = 10;
   currentPage = 1;
   maxlenght = 0;
   lastPage = 1;
  constructor(
    private accueilService: AccueilService,
    private router:Router, private notifierService: NotifierService,
    private helperService: HelperService) {

     }

  ngOnInit() {
    this.doRechercheCandidat();
    this.loadSessionReporting();
    this.loadSourceurtechnologies();
    this.getChart();
  }
  doRechercheCandidat() {
    let page = (this.currentPage - 1) * this.size;
    this.accueilService.getNombreCVRrelancer(page, this.size).subscribe(data => {
      this.maxlenght = data.total;
      this.ReportingChargeRelance = data.results;
      this.lastPage = Math.ceil(this.maxlenght / this.size)
      this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
    })
  }

  setPage(p) {
    this.currentPage = p;
    this.pages = this.helperService.generatePages(this.currentPage, this.lastPage)
    this.doRechercheCandidat();
  }

  /*private loadReportingChargeRelance() {
    this.accueilService.getNombreCVRrelancer().subscribe(result => { this.ReportingChargeRelance = result });
  }*/
   private loadSessionReporting() {
    this.accueilService.getSessionreporting().subscribe(result => {  this.Sessionreporting = result});
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
