import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Candidate } from "../candidate";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeTousCandidats.component.html',
  
})
export class listeTousCandidatsComponent implements OnInit {

  technologies=[]
  lieux=[]
  origines=[]
  competences=[]
  candidats: any[];
  page= 0;
  size= 10;
  condidat: Candidate = new Candidate();

  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,
    private notifierService:NotifierService,private competencesService:CompetencesService,
    private lieuxService:LieuxService) {}

  ngOnInit(): void {
    this.getListeCandidat();
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
  }

  getListeCandidat(){
    this.candidatsService.getTousCandidats(this.page,this.size).subscribe(data => this.candidats = data);
  }
  rechercheCandidat() {
      this.candidatsService.rechercheTouscandidats(this.condidat).subscribe(data=>{this.candidats = data
        this.notifierService.notify("info","Nombre Candidat : "+data.length)
      })
   }
}
