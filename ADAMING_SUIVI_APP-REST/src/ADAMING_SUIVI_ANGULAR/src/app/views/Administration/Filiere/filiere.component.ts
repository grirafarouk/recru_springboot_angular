import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";

import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";

import { Technologie } from "../../../models/Technologie";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";
import { Formation } from "../../Sessions-Formations/formation";
import { Session } from "inspector";
import { SessionFormation } from "../../../models/SessionFormation";


@Component({
  templateUrl: 'filiere.component.html',
  styleUrls:["filiere.component.css"]
})
export class FiliereComponent implements OnInit {

  constructor(private sessionFormationService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService,private lieuxService:LieuxService,private typeFormationService: TypeFormationService) { }
  session: SessionFormation= new SessionFormation(); 
  sessionFormations: any ;
  formations: any;
  t = [];
  isCollapsed=[];
  formation: Formation = new Formation();
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
      this.formationService.getAllFormations().subscribe(data =>{
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;
      });
      this.sessionFormationService.getAllSessions().subscribe(data => {
        this.sessionFormations = data;
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
      console.log(event);
    }

    expanded(event: any): void {
      console.log(event);
    }

    activerDesactiverSession(event: any){
      console.log(event);

    }

}
