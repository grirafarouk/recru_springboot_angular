import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { ReportingSourceurService } from "../../../services/reportingSourceurService/ReportingSourceur/reportingSourceur.service";
import { SourceurReporting } from "../../../models/SourceurReporting";
import { ChartColors } from '../../../helper/application.constant';
//import 'chartjs-plugin-labels';
import 'chart.piecelabel.js';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { reportingSourceurExel } from "../../../models/reportingSourceurExel";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


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
  ListSourceur:Array<SourceurReporting>= [];
  pieChartData: number[] = [];
  pieChartLabels: string[]=[];
  pieChartType = 'pie';
  chartOptions = {};
  chartOptions2 = {};
  ChartColors : any[]=ChartColors
   autresCv = null;
   reporting_exel_file :Array<reportingSourceurExel>= [];

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

  

  rechercherReportingSourceur(sourceur){
    this.autresCv = 0;
    this.totalCVDisponible = 0;
    this.totalCVhorsCible = 0;
    this.reportingSourceur.getNbrTechnologieSourceur(sourceur,this.dateDebut,this.dateFin).subscribe(result => {
      this.chartOptions = {
        pieceLabel: {
          render: function (args) {
            const value = args.value;
            var tooltipPercentage = Math.round((value / result) * 100)
            return tooltipPercentage + '%';
          }
        }
      }
    });
    this.reportingSourceur.getNbrTotalCvParCandidat(sourceur,this.dateDebut,this.dateFin).subscribe(result => {
      this.chartOptions2 = {
        pieceLabel: {
          render: function (args) {
            const value = args.value;
            var tooltipPercentage = Math.round((value / result) * 100)
            return tooltipPercentage + '%';
          }
        }
      }
    });
    this.reportingSourceur.rechercheReportingSourceur(this.sourceur,this.dateDebut,this.dateFin).subscribe(data =>{
      this.ListReporting = data;
      console.log(this.ListReporting)
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
    this.reportingSourceur.getNbrTechnologie().subscribe(result => {
      this.chartOptions = {
        pieceLabel: {
          render: function (args) {
            const value = args.value;
            var tooltipPercentage = Math.round((value / result) * 100)
            return tooltipPercentage + '%';
          }
        }
      }
    });
    this.reportingSourceur.getNbrTotalCv().subscribe(result => {

      this.chartOptions2 = {
        pieceLabel: {
          render: function (args) {
            const value = args.value;
            var tooltipPercentage = Math.round((value / result) * 100)
            return tooltipPercentage + '%';
          }
        }
      }
    });
    this.reportingSourceur.getChartTechnologies().subscribe(result => { 
      this.pieChartData = Object.values(result);
      for(var i=0;i<Object.keys(result).length;i++){
        this.pieChartLabels[i]=Object.keys(result)[i];
      }
    });
  }

public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'Liste reporting' + EXCEL_EXTENSION);
  }
  exportAsXLSX(): void {
    
    this.ListReporting.forEach(element=>{
      let liste=new reportingSourceurExel();
    liste.Sourceur=element.nomSourceur;
    liste.Taux_de_satisfaction=element.taux+' %';
    liste.CV_disponibles=element.nbrDsipo;
    liste.Hors_cible=element.nbrHors;
    liste.Total=element.nbrTotal;
    if(this.reporting_exel_file.indexOf(liste) === -1)
    this.reporting_exel_file.push(liste);


    })
    this.exportAsExcelFile(this.reporting_exel_file, 'sample');
    this.reporting_exel_file=[];
  }
  reset(){
    this.ngOnInit();
  }

}
