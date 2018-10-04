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
  templateUrl: 'listeNouveauxCandidats.component.html',
  styleUrls: ["listeNouveauxCandidats.component.css"]
  
})
export class listeNouveauxCandidatsComponent implements OnInit {
  
  mask: any[] = [/\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/];
  technologies=[]
  origines=[]
  competences=[]
  candidats: any[];
  page= 0;
  pages= [];
  size= 10;
  condidat: Candidate = new Candidate();
  CritereRecheche : [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  currentPage= 0;
  maxlenght= 0;
  i=0;
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
    this.candidatsService.getNouveauxCandidats(this.page,this.size).subscribe(data =>{this.candidats = data
    this.maxlenght=data.length});

    this.candidatsService.MaxLength().subscribe(data =>{
      this.maxlenght = data
    for (this.i = 0; this.i < (this.maxlenght/this.size); this.i++) {
    this.pages[this.i] = (this.i + 1);
    }
    this.setPage(1);
    })
  }
  rechercheCandidat() {
      this.candidatsService.rechercheNouveauxcandidats(this.condidat).subscribe(data=>{this.candidats = data
        this.notifierService.notify("info","Nombre Candidat : "+data.length)
      })
      for (let i = 0; i < (this.candidats.length/this.size); i++) {
        this.pages[i] = (i + 1);
        }
        
      
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

   setPage(p) {
    this.currentPage =p;
    console.log("current "+this.currentPage)
    this.page = (p - 1) * 10;
    this.candidatsService.getNouveauxCandidats(this.page, this.size).subscribe(data => this.candidats = data);
        
  }
  
}
