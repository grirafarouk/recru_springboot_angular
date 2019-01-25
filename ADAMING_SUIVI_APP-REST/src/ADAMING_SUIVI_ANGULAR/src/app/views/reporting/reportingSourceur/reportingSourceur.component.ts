import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { ReportingSourceurService } from "../../../services/reportingSourceurService/ReportingSourceur/reportingSourceur.service";
import { SourceurReporting } from "../../../models/SourceurReporting";
import { ChartColors } from '../../../helper/application.constant';
import 'chartjs-plugin-labels';


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'reportingSourceur.component.html',
  styleUrls: ["reportingSourceur.component.css"]
  
})
export class ReportingSourceurComponent implements OnInit {
  totalCv = null;
  dateFin = Date();
  dateDebut =  Date();
  currentDate = new Date();
  ListReporting=[]
  ListSourceur=[]
  pieChartData: number[] = [];
  pieChartLabels: string[]=[];
  pieChartType = 'pie';
  ChartColors : any[]=ChartColors
   autresCv = null;
   totalCVDisponible = null;
   totalCVhorsCible = null;
   pieChart2Data= [];
   pieChart2Labels=["Autres", "CV disponibles", "CV hors cible"];
   Chart2Colors : any[]=ChartColors
   sourceur:SourceurReporting = new SourceurReporting();
  constructor(private sanitizer: DomSanitizer,private reportingSourceur :ReportingSourceurService,
    private notifierService:NotifierService) {}

  ngOnInit(): void {
    this.autresCv = null;
    this.totalCVDisponible = null;
    this.totalCVhorsCible = null;
    this.sourceur=new SourceurReporting();
    this.dateDebut=null;
    this.dateFin=null;
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
  chartOptions ={
    responsive: true,
    labels: {
      render: 'percentage',
      precision: 2
    }
  
}

  chartOptions2 : {
      labels: {
        render: 'percentage',
        responsive: true,
        precision: 2
      }
    
  }



  rechercherReportingSourceur(sourceur){
    this.autresCv = 0;
    this.totalCVDisponible = 0;
    this.totalCVhorsCible = 0;
    this.reportingSourceur.rechercheReportingSourceur(this.sourceur,this.dateDebut,this.dateFin).subscribe(data =>{
      this.ListReporting = data;
      for( let i=0; i<this.ListReporting.length; i++)
      {      
          this.autresCv = this.autresCv + this.ListReporting[i].autre,
          this.totalCVDisponible = this.totalCVDisponible + this.ListReporting[i].nbrDsipo,
          this.totalCVhorsCible = this.totalCVhorsCible + this.ListReporting[i].nbrHors
      }
      this.pieChart2Data=[this.autresCv, this.totalCVDisponible, this.totalCVhorsCible]
    })

    this.reportingSourceur.recherchemapTechnologieParSourceur(this.sourceur,this.dateDebut,this.dateFin).subscribe(result =>{
      this.pieChartData = Object.values(result);
      if(Object.keys(result).length > 0)
      { 
        for(var i=0;i<Object.keys(result).length;i++)
        {
        this.pieChartLabels[i]=Object.keys(result)[i];
        }
      }
      else{
        this.pieChartData = [0,0,0,0,0,0,0];
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
