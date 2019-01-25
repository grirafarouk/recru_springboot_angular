import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { first } from 'rxjs/operators';
import { AccueilService } from '../../../services/accueilService/accueil.service';
// import { CVRelance } from '../../../models/CVRelance';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  templateUrl: 'ficheCandidatSession.component.html'
})
export class ficheCandidatSessionComponent implements OnInit {


  constructor(private route: ActivatedRoute,private accueilService: AccueilService) { }
  id: number;
  sub: any;
  CandidatSession=[];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
      this.accueilService.getCandidatSession(this.id).subscribe(data => {
      this.CandidatSession = data;
       });
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'Liste candidats' + EXCEL_EXTENSION);
  }
  exportAsXLSX():void {
    this.exportAsExcelFile(this.CandidatSession, 'sample');
  } 
}
