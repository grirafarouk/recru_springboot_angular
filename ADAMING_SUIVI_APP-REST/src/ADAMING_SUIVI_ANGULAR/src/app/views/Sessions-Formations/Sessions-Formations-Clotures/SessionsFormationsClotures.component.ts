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


@Component({
  templateUrl: 'SessionsFormationsClotures.component.html',
  styleUrls:["SessionsFormationsClotures.component.css"]
})
export class SessionsFormationsCloturesComponent implements OnInit {

  constructor(private router:Router,private sessionFormationService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService,private lieuxService:LieuxService,private typeFormationService:TypeFormationService) { }
  session: any = {}; 
  sessionFormations: any ;
  formations: any;
  t: any = [];
  isCollapsed=[];
  formation: Formation = new Formation();
  //session: Session=new Session();
  technologies = [];
  lieux=[];
  typeFormation=[]

  ngOnInit() { 
    this.getListe();
  }

  getListe(){
    this.typeFormationService.findAllTypeFormation().subscribe(data =>
      this.typeFormation=data);
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
    this.formationService.getListeformationclotures().subscribe(data =>{
    data.forEach(element => {
      this.isCollapsed.push(true)
    });
    this.formations = data;
    });
    this.sessionFormationService.getSessionFormationClotures(this.session).subscribe(data => {
      this.sessionFormations = data;
      /*for (let i = 0; i < this.sessionFormations.length; i++) {
        let sf = this.sessionFormations[i];
        this.sessionFormationService.NombreParticipants(sf).subscribe(resp => { this.t[i] = (resp) })
      };*/

    });
  }

  rechercherSession(){
 
    this.sessionFormationService.rechercherSessionFormationenclotures(this.formation).subscribe(data => 
      this.formations = data
     );
    }


  reset(){
    this.formation.code=null;
    this.formation.nom = null;
    this.formation.technologie.libelle = null;
    this.formation.lieu.libelle = null;
    this.formation.typeFormation.libelle = null;
    this.getListe();
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  openDetails(sessionFormation){
    this.router.navigate([NAVIGATION_RULES.sessionsFormations.url+'/'+NAVIGATION_RULES.sessionsFormations.details.replace(':id',sessionFormation.id)]);
  }
}
