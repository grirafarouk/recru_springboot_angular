import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DATE_FORMAT_MOMENT } from '../helper/application.constant';
import * as _moment from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {



  }

  public exportAsExcelFile(json: any[], excelFileName: string, columns: any[]): void {



    var cleanData = [];
    var cleanCol = {}
    var col = []
    json.forEach(element => {
      var cleanItem = {}
      columns.forEach(col => {
         if (element[col.data] == null) {
          cleanItem[col.title] =' - ';
        }

        if (element[col.data] != null) {
          if (col.dateFormat != undefined)
            cleanItem[col.title] = _moment(element[col.data]).format(DATE_FORMAT_MOMENT);
          else if (col.mask != undefined && element[col.data].indexOf("-") == -1) {
            cleanItem[col.title] = element[col.data].replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}).*/, "$1-$2-$3-$4-$5");
          }
          
          else if (col.rendered) {
            if (col.html == false)
              cleanItem[col.title] = col.rendered(element)
          }
          else cleanItem[col.title] = element[col.data];

          if (cleanCol[col.data] == null) cleanCol[col.data] = col.title.length;
          if (cleanItem[col.title].length > cleanCol[col.data])
            cleanCol[col.data] = cleanItem[col.title].length
        }
      })
      cleanData.push(cleanItem);
    });
    Object.keys(cleanCol).forEach(element => {
      col.push({ wch: cleanCol[element] + 1 })
    });



    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(cleanData);
    worksheet["!cols"] = col
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellDates: true, cellStyles: true });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}