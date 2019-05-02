import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { first } from 'rxjs/operators';
import { AccueilService } from '../../../services/accueilService/accueil.service';
// import { CVRelance } from '../../../models/CVRelance';

@Component({
  templateUrl: 'ficheCvRelance.component.html'
})
export class ficheCvRelanceComponent implements OnInit {


  constructor(private route: ActivatedRoute,private accueilService: AccueilService) { }
  id: number;
  sub: any;
  CVRelance=[];
  
  p:number;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
      this.accueilService.getCVRelanceByCharge(this.id).subscribe(data => {
      this.CVRelance = data;
       });
  }

 
}
