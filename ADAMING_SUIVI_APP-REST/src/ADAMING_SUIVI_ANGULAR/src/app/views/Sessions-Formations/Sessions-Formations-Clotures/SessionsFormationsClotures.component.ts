import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";

import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";
import { Formation } from "../formation";
import { NAVIGATION_RULES } from "../../../helper/application.constant";
import { SessionsFormationsService } from "../../../services/sessionService/sessions-formations.service";
import { SessionFormation } from "../../../models/SessionFormation";


@Component({
  templateUrl: 'SessionsFormationsClotures.component.html',
  styleUrls: ["SessionsFormationsClotures.component.css"]
})
export class SessionsFormationsCloturesComponent implements OnInit {

  constructor(
    private sessionFormationService: SessionsFormationsService,
    private router: Router, private sessionFormationEnCoursService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService, private lieuxService: LieuxService, private typeFormationService: TypeFormationService) { }
  //session: any = {};
  sessionFormations: any;
  formations: any;
  t: any = [];
  isCollapsed = [];
  formation: Formation = new Formation();
  session: SessionFormation = new SessionFormation();
  technologies = [];
  lieux = [];
  typeFormation = []

  ngOnInit() {
    this.getListe();
  }

  async  getListe() {
    this.typeFormationService.findAllTypeFormation().subscribe(data =>
      this.typeFormation = data);
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })
    this.formationService.getListeformationclotures().subscribe(data => {
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;

    });
    this.sessionFormationEnCoursService.getSessionFormationClotures(this.session).subscribe(data => {
      this.sessionFormations = data;
      this.sessionFormations.forEach(element => {
        this.sessionFormationService.nombreParticipants(element).toPromise().then(data => {
          element.nombreParticipants = data;
        })
      });
    });
  }

  rechercherSession() {
    this.sessionFormationEnCoursService.rechercherSessionFormationenclotures(this.session).subscribe(data =>
      this.formations = data
    );
  }


  reset() {
    this.formation=new Formation();
    this.getListe();
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
