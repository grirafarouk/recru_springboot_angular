import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccueilService } from '../../../services/accueilService/accueil.service';
import { NAVIGATION_RULES } from '../../../helper/application.constant';

@Component({
  templateUrl: 'listSessionsFormationsAcceuil.component.html'
})
export class listSessionsFormationsAcceuilComponent implements OnInit {

  Sessionreporting= [];
  constructor(
    private accueilService: AccueilService,
    private router:Router) {

     }

  ngOnInit() {
    this.loadSessionReporting();
  }

  private loadSessionReporting() {
    this.accueilService.getSessionreporting().subscribe(result => { this.Sessionreporting = result });
  }
  
  openDetailsSession(session){
    this.router.navigate(["/"+NAVIGATION_RULES.sessionsFormationsAcceuil.url+"/"+NAVIGATION_RULES.sessionsFormationsAcceuil.details.replace(":id",session.idSession)])
  }
}
