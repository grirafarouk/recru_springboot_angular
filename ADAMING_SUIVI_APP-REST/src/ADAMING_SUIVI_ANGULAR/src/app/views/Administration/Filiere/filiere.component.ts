import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";

import { FormationService } from "../../../services/sessionService/formation.service";
import { SessionFormationEnCoursService } from "../../../services/sessionService/session-formation-en-cours.service";

import { Technologie } from "../../../models/Technologie";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";
import { Formation } from "../../Sessions-Formations/formation";
import { SessionFormation } from "../../../models/SessionFormation";
import { SessionsFormationsService } from "../../../services/sessionService/sessions-formations.service";
import { ClientSessionService } from "../../../services/administrationService/clientSessionService";
import { HelperService } from "../../../helper/helper.service";


@Component({
  templateUrl: 'filiere.component.html',
  styleUrls: ["filiere.component.css"]
})
export class FiliereComponent implements OnInit {

  constructor(private clientSessionService: ClientSessionService, private helperService: HelperService,private sessionFormationEnCourService: SessionFormationEnCoursService,
    private sessionFormationService: SessionsFormationsService, private notifierService: NotifierService, private sessionFormationEnCoursService: SessionFormationEnCoursService, private formationService: FormationService,
    private technologiesService: TechnologieService, private lieuxService: LieuxService, private typeFormationService: TypeFormationService) { }

  @ViewChild("SessionFormationModal")
  SessionFormationModal;

  @ViewChild("FormationModal")
  FormationModal;

  session: SessionFormation = new SessionFormation();

  selectedFormation: Formation = new Formation();

  listclientSession = [];

  sessionFormations: any;
  formations: any;
  t = [];
  isCollapsed = [];
  formation: Formation = new Formation();
  technologies = [];
  lieux = [];
  typeFormation = []

  ngOnInit() {
    this.getListe();
  }

  rechercherSession() {
    this.sessionFormationEnCourService.rechercherFormations(this.session).subscribe(data => {
      this.isCollapsed = [];
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;
      this.sessionFormationEnCourService.getSessionFormation(this.session).subscribe(data => {
        this.sessionFormations = data;
      });
    }
    );
  }

  getListe() {
    this.clientSessionService.findAllClientSession().subscribe(data => {
      this.listclientSession = data;
    })
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
    this.formationService.getAllFormations().subscribe(data => {
      data.forEach(element => {
        this.isCollapsed.push(true)
      });
      this.formations = data;
    });
    this.sessionFormationEnCoursService.getAllSessions().subscribe(data => {
      this.sessionFormations = data;
    });
  }

  reset() {
    this.session = new SessionFormation();
    this.getListe();
  }

  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  activerDesactiverSession(sessionF) {
    if (sessionF.factif != null && sessionF.factif) {
      this.notifierService.notify("success", "Succès !! " + "Session Désactivée !");
      sessionF.factif = false;
    }
    else {
      sessionF.factif = true;
      this.notifierService.notify("success", "Succès !! " + "Session Activée !");
    }
    this.sessionFormationService.updateSession(sessionF).subscribe(data => {

    })

  }

  showFormationModal(){
    this.selectedFormation= new Formation();
    this.FormationModal.show();
  }

  saveFormation(){
    this.selectedFormation.code=this.selectedFormation.typeFormation.libelle+"-"+this.selectedFormation.technologie.libelle+"-"+this.selectedFormation.lieu.libelle;  
    this.formationService.ajoutFormation(this.selectedFormation).subscribe(data=>{
      this.notifierService.notify("success", "Formation ajouté ajouté avec succés !")
      this.FormationModal.hide();
      this.ngOnInit();
    },error =>{
      this.notifierService.notify("error", "Error!")
    })
  }

  showSessionFormationModal(formation) {
    this.session = new SessionFormation();
    this.session.formation = formation;
    this.SessionFormationModal.show();
  }

  showEditSessionModal(sessionF){
    this.session =Object.assign({}, sessionF);
    this.session.dateDemarrage= new Date(this.session.dateDemarrage);
    this.session.dateFin= new Date(this.session.dateFin);
    this.SessionFormationModal.show();
  }

  saveSessioFormation() {
    if (this.session.id > 0)
      this.updateSessionFormtation();
    else
      this.createSessionFormtaion();
  }

  createSessionFormtaion() {
    this.sessionFormationService.updateSession(this.session).toPromise().then((data) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Session ajouté ajouté avec succés !");
      }
      this.SessionFormationModal.hide();
    },(error)=>{
      this.notifierService.notify("error", "Error")
    })
  }

  updateSessionFormtation() {
    this.sessionFormationService.updateSession(this.session).toPromise().then((data) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Session modifié ajouté avec succés !")
      }
      this.SessionFormationModal.hide();
    },(error)=>{
      this.notifierService.notify("error", "Error")
    })
  }

  collapseExpand(i) {
    for (let index = 0; index < this.isCollapsed.length; index++) {
      if (index == i)
        this.isCollapsed[i] = !this.isCollapsed[i]
      else this.isCollapsed[index] = true;
    }
  }
}
