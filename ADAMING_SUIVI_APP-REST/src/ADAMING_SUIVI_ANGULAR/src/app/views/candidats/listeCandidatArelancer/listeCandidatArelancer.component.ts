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
  templateUrl: 'listeCandidatArelancer.component.html',
  
})
export class listeCandidatArelancerComponent implements OnInit {

  technologies=[]
  origines=[]
  competences=[]
  candidats: any[];
  page= 0;
  size= 10;
  condidat: Candidate = new Candidate();

  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,
    private notifierService:NotifierService,private competencesService:CompetencesService) {}

  ngOnInit(): void {
    this.getListeCandidat();
  }

  getListeCandidat(){
    this.candidatsService.getCandidatArelancer(this.page,this.size).subscribe(data => this.candidats = data);
  }
  rechercheCandidat() {
      this.candidatsService.rechercheCandidatArelancer(this.condidat).subscribe(data=>{this.candidats = data
        this.notifierService.notify("info","Nombre Candidat : "+data.length)
      })
   }
}
