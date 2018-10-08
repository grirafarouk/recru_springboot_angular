import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";
import { Formation } from "../formation";


@Component({
  templateUrl: 'FicheSessionFormation.component.html',
  styleUrls:["FicheSessionFormation.component.css"]
})
export class FicheSessionFormationComponent implements OnInit {

  constructor(private sessionFormationService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService,private lieuxService:LieuxService,private typeFormationService: TypeFormationService,
    private route: ActivatedRoute) { }
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
  id: number;
  sub: any;
  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
  }

  getListe(){
  
  }

  



}
