import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";

import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";


@Component({
  templateUrl: 'SessionsFormationsEncours.component.html',
  styleUrls:["SessionsFormationsEncours.component.css"]
})
export class SessionsFormationsEncoursComponent implements OnInit {

  constructor(private sessionFormationService: SessionFormationEnCoursService, private formationService: FormationService) { }
  session: any = {}; 
  sessionFormations: any ;
  formations: any;
  t: any = [];

  ngOnInit() { 
    this.formationService.getFormations().subscribe(data => this.formations = data);
    this.sessionFormationService.getSessionFormationEnCours(this.session).subscribe(data => {
      this.sessionFormations = data;
      for (let i = 0; i < this.sessionFormations.length; i++) {
        let sf = this.sessionFormations[i];
        this.sessionFormationService.NombreParticipants(sf).subscribe(resp => { this.t[i] = (resp) })
      };

    });

  }


}
