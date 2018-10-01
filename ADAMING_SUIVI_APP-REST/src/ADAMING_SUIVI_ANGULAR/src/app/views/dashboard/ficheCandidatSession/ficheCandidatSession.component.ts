import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { first } from 'rxjs/operators';
import { AccueilService } from '../../../services/accueilService/accueil.service';
// import { CVRelance } from '../../../models/CVRelance';

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
      this.id = +params['idSession']; 
    });
      this.accueilService.getCandidatSession(this.id).subscribe(data => {
      this.CandidatSession = data;
       });
  }
  /*ExportExcel() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['idSession']; 
    });
    this.accueilService.getCandidatSession(this.id).subscribe(res => {
                  var XLSX = require('xlsx')
                  var ws = XLSX.utils.json_to_sheet(res);
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, 'nom');
                  var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
                  function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                  }
                  var ieEDGE = navigator.userAgent.match(/Edge/g);
                  var ie = navigator.userAgent.match(/.NET/g);
                  var oldIE = navigator.userAgent.match(/MSIE/g);
                  if (ie || oldIE || ieEDGE) {
                    var blob = new window.Blob([ s2ab(wbout)], {
                      type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var fileName = '';
                    window.navigator.msSaveBlob(blob, fileName);
                  } else {
                  
                    var file = new Blob([s2ab(wbout)], {
                      type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    var downloadLink = document.createElement("a");
                    downloadLink.download = '';
                    downloadLink.innerHTML = "Download File";
                    downloadLink.href = fileURL;
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                  }
    });
  }*/
 
}
