import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Candidate } from '../../../models/candidate';
import { CodePostal } from '../../../models/CodePostal';
import { Technologie } from '../../../models/Technologie';
import { Origine } from '../../../models/Origine';
import { TechnologieService } from '../../../services/administrationService/TechnologieService';
import { OriginesService } from '../../../services/administrationService/origines.service';
import { CodePostalService } from '../../../services/administrationService/code-postal.service';
import { CompetencesService } from '../../../services/administrationService/competences.service';
import { Competence } from '../../../models/Competence';
import { CandidatsService } from '../../../services/candidats.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fiche-candidat',
  templateUrl: './fiche-candidat.component.html',
  styleUrls: ['./fiche-candidat.component.scss']
})
export class FicheCandidatComponent implements OnInit {
  
  codePostals: Array<CodePostal> = [];
  technologies: Array<Technologie> = []
  origines: Array<Origine> = []
  competences: Array<Competence> = []
  pdfSource;
  file;
  currentCandidat:Candidate;
  constructor(private route:ActivatedRoute, private competencesService: CompetencesService,
    private codePostalService: CodePostalService, private originesService: OriginesService,
     private technologiesService: TechnologieService,private candidatsService:CandidatsService,
     private sanitizer: DomSanitizer,private router: Router) 
     { }

  ngOnInit() {

    this.route.data
    .subscribe((data: { candidat: Candidate ,title:string}) => {
      data.title=  data.title+data.candidat.id;
      this.currentCandidat = data.candidat;
      this.codePostaleOnSearch(this.currentCandidat.codePostal.code)
      this.candidatsService.getCvCandidats(this.currentCandidat).subscribe(res=>{
        this.file=res;
        var reader = new FileReader();
        reader.onload = (e) => {
          var fileBase64Value = reader.result + ''
            this.pdfSource=this.sanitizer.bypassSecurityTrustResourceUrl(fileBase64Value.replace("pdf/plain","application/pdf"))
        }
        reader.readAsDataURL(res.data);
      })
    });

    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
    this.competencesService.findAllCompetences().subscribe(data => {
      this.competences = data;
    })

  }

  codePostaleOnSearch(value) {
    if (value != "")
      this.codePostalService.completeCodePostal(value).subscribe(data => {
        data.forEach(element => {
          this.codePostals = [...  this.codePostals, element]
          if(element.id==this.currentCandidat.codePostal.id){
            this.currentCandidat.codePostal=element
          }
        });
        
      })
    else this.codePostals = []
  }
  downloadPDF(){

        var url = window.URL.createObjectURL(this.file.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = this.file.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
  }
}
