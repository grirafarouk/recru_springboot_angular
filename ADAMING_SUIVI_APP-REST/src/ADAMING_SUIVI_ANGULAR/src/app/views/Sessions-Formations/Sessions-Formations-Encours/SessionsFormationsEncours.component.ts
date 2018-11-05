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


@Component({
  templateUrl: 'SessionsFormationsEncours.component.html',
  styleUrls:["SessionsFormationsEncours.component.css"]
})
export class SessionsFormationsEncoursComponent implements OnInit {

  constructor(private router:Router,private sessionFormationService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService,private lieuxService:LieuxService,private typeFormationService: TypeFormationService) { }
  session: any = {}; 
  sessionFormations: any ;
  formations: any;
  t = [];
  isCollapsed=[];
  formation: Formation = new Formation();
  //session: Session=new Session();
  technologies = [];
  lieux=[];
  typeFormation=[]
  ngOnInit() { 
    
    this.getListe();
  }
  rechercherSession(){
 
    this.sessionFormationService.rechercherSessionFormationencours(this.formation).subscribe(data => 
      this.formations = data
     );
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
      this.formationService.getListeformationencours().subscribe(data =>{
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;
      });
      this.sessionFormationService.getSessionFormationEnCours(this.session).subscribe(data => {
        this.sessionFormations = data;
        /*for (let i = 0; i < this.sessionFormations.length; i++) {
          let sf = this.sessionFormations[i];
          this.sessionFormationService.NombreParticipants(sf).subscribe(resp => { 
            this.t[i] = resp })
        };*/
  
      });
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
