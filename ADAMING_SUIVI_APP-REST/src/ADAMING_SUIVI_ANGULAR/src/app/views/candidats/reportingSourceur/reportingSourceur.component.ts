import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { ReportingSourceurService } from "../../../services/reportingSourceurService/ReportingSourceur/reportingSourceur.service";
import { SourceurReporting } from "../../../models/SourceurReporting";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'reportingSourceur.component.html',
  styleUrls: ["reportingSourceur.component.css"]
  
})
export class reportingSourceurComponent implements OnInit {
  
  ListReporting=[]
  ListSourceur=[]
  pieChartData: number[] = [];
  pieChartLabels: string[]=[];
  pieChartType = 'pie';
  ChartColors : any[]=[
    {
      backgroundColor:["#FF7360","#6FC8CE","gray","#FFFCC4","#B9E8E0","#FFABF6","#01FBBA"]
    }
   ];
   autresCv = null;
   totalCVDisponible = null;
   totalCVhorsCible = null;
   pieChart2Data= [];
   pieChart2Labels=["Autres", "CV disponibles", "CV hors cible"];
   Chart2Colors : any[]=[
    {
      backgroundColor:["#FF7360","#6FC8CE","gray"]
    }
   ];
   sourceur:SourceurReporting = new SourceurReporting();
  constructor(private sanitizer: DomSanitizer,private reportingSourceur :ReportingSourceurService,
    private notifierService:NotifierService) {}

  ngOnInit(): void {

    this.reportingSourceur.findAllSourceur().subscribe(data=>{
      this.ListSourceur = data;
    })

    this.reportingSourceur.findReportingSourceur().subscribe(data=>{
      this.ListReporting = data;
      for( let i=0; i<this.ListReporting.length; i++)
      {      
          this.autresCv = this.autresCv + this.ListReporting[i].autre,
          this.totalCVDisponible = this.totalCVDisponible + this.ListReporting[i].nbrDsipo,
          this.totalCVhorsCible = this.totalCVhorsCible + this.ListReporting[i].nbrHors
      }
      this.pieChart2Data=[this.autresCv, this.totalCVDisponible, this.totalCVhorsCible]
    })
 
    this.getChart();
 
  }

  rechercherReportingSourceur(sourceur){
    this.autresCv = 0;
    this.totalCVDisponible = 0;
    this.totalCVhorsCible = 0;
    this.reportingSourceur.rechercheReportingSourceur(this.sourceur).subscribe(data =>{
      this.ListReporting = data;
      for( let i=0; i<this.ListReporting.length; i++)
      {      
          this.autresCv = this.autresCv + this.ListReporting[i].autre,
          this.totalCVDisponible = this.totalCVDisponible + this.ListReporting[i].nbrDsipo,
          this.totalCVhorsCible = this.totalCVhorsCible + this.ListReporting[i].nbrHors
      }
      this.pieChart2Data=[this.autresCv, this.totalCVDisponible, this.totalCVhorsCible]
    })

    this.reportingSourceur.recherchemapTechnologieParSourceur(this.sourceur).subscribe(result =>{
      this.pieChartData = Object.values(result);
      for(var i=0;i<Object.keys(result).length;i++){
        this.pieChartLabels[i]=Object.keys(result)[i];
      }
    })

  }

  private getChart(){
    this.reportingSourceur.getChartTechnologies().subscribe(result => { 
      this.pieChartData = Object.values(result);
      for(var i=0;i<Object.keys(result).length;i++){
        this.pieChartLabels[i]=Object.keys(result)[i];
      }
    });

  }

 

  reset(){
    this.ngOnInit();
  }


  
}
