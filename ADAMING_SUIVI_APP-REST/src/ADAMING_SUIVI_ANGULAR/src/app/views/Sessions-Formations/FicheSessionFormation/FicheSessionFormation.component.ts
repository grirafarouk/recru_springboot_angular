import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsFormationsService } from "../../../services/sessionService/sessions-formations.service";
import { RoutingState } from "../../../helper/routing-state.service";


@Component({
  templateUrl: 'FicheSessionFormation.component.html',
  styleUrls:["FicheSessionFormation.component.css"]
})
export class FicheSessionFormationComponent implements OnInit {

  constructor(private sessionFormationService: SessionsFormationsService,
    private route: ActivatedRoute,private router: Router, private routingState: RoutingState) { }
  session: any = {}; 
  id: number;
  sub: any;
  candidats= [];

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    
    this.sessionFormationService.getFicheSessionFormation(this.id).subscribe(data => {
      this.session = data;
  this.sessionFormationService.getListCandidats(this.session).subscribe(res => this.candidats = res)
  });
  }

  private annuler() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }

  



}
