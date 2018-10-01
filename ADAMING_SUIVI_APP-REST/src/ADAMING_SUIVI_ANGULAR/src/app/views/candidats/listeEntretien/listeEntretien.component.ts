import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Candidate } from "../candidate";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeEntretien.component.html',
  
})
export class listeEntretienComponent implements OnInit {
  
  mask: any[] = [/\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/];
  technologies=[]
  origines=[]
  competences=[]
  candidats: any[];
  page= 0;
  size= 10;
  condidat: Candidate = new Candidate();
  CritereRecheche : [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];

  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,
    private notifierService:NotifierService,private competencesService:CompetencesService) {}

  ngOnInit(): void {
    this.getListeCandidat();
    this.technologiesService.findAllTechnologies().subscribe(data=>{
      this.technologies = data;
    })
  }

  getListeCandidat(){
    this.candidatsService.getCandidatEntretien(this.page,this.size).subscribe(data => this.candidats = data);
  }
  rechercheCandidat() {
      this.candidatsService.rechercheNouveauxcandidats(this.condidat).subscribe(data=>{this.candidats = data
        this.notifierService.notify("info","Nombre Candidat : "+data.length)
      })
   }

   reset(){
     this.condidat.nom=null;
     this.condidat.prenom = null;
     this.condidat.numeroTel = null;
     this.condidat.email = null;
     this.condidat.dateInscription= null;
     this.condidat.technologie = null;
     this.condidat.nomSourceur = null;
     this.condidat.prenomSourceur = null;
     this.condidat.region = null;
     this.condidat.dateInscription = null;
     this.condidat.critereRecheche = null;
     this.getListeCandidat();
   }
  
}
