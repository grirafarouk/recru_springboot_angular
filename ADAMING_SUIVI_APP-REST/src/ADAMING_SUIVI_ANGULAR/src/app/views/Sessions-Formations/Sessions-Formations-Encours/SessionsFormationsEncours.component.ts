import { HelperService } from './../../../helper/helper.service';
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";

import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";
import { Formation } from "../formation";
//import { Session } from "../session";
import { Technologie } from "../../../models/Technologie";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";
import { Router } from "@angular/router";
import { NAVIGATION_RULES } from "../../../helper/application.constant";
import { SessionsFormationsService } from "../../../services/sessionService/sessions-formations.service";
import { SessionFormation } from "../../../models/SessionFormation";
import { RoutingState } from '../../../helper/routing-state.service';


@Component({
  templateUrl: 'SessionsFormationsEncours.component.html',
  styleUrls: ["SessionsFormationsEncours.component.css"]
})
export class SessionsFormationsEncoursComponent implements OnInit {

  constructor(
    private sessionFormationService: SessionsFormationsService, private helperService: HelperService, private routingState: RoutingState,
    private router: Router, private sessionFormationEnCourService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService, private lieuxService: LieuxService, private typeFormationService: TypeFormationService) { }
  //sessionn: any = {}; 
  sessionFormations: any;

  formations: any;
  t = [];
  isCollapsed = [];
  formation: Formation = new Formation();
  session: SessionFormation = new SessionFormation();
  technologies = [];
  lieux = [];
  typeFormation = []
  ngOnInit() {
    if (this.routingState.getPreviousUrl().indexOf('details') > -1) {
      this.formations = this.helperService.formations;
      this.sessionFormations = this.helperService.sessionFormations;
      this.isCollapsed = []
      this.formations.forEach(element => {
        this.isCollapsed.push(true);
      });
      this.chargeListe();
    }
    else this.getListe();
  }

  rechercherSession() {
    this.sessionFormationEnCourService.rechercherSessionFormationencours(this.session).subscribe(data => {
      this.isCollapsed = [];
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;
      this.sessionFormationEnCourService.getSessionFormationEnCours(this.session).subscribe(data => {
        this.sessionFormations = data;
        this.sessionFormations.forEach(element => {
          this.sessionFormationService.nombreParticipants(element).toPromise().then(data => {
            element.nombreParticipants = data;
          })
        });
      });
    }
    );
  }

  chargeListe() {
    this.typeFormationService.findAllTypeFormation().subscribe(data =>
      this.typeFormation = data);
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })


  }
  getListe() {

    this.chargeListe();
    this.rechercherSession();
  }

  reset() {
    this.session = new SessionFormation();
    this.getListe();
  }

  ngOnDestroy(): void {
    this.helperService.formations = this.formations;
    this.helperService.sessionFormations = this.sessionFormations;

  }
  openDetails(sessionFormation) {
    this.router.navigate([NAVIGATION_RULES.sessionsFormations.url + '/' + NAVIGATION_RULES.sessionsFormations.details.replace(':id', sessionFormation.id)]);
  }


  collapseExpand(i) {
    for (let index = 0; index < this.isCollapsed.length; index++) {
      if (index == i)
        this.isCollapsed[i] = !this.isCollapsed[i]
      else this.isCollapsed[index] = true;
    }
  }
}
