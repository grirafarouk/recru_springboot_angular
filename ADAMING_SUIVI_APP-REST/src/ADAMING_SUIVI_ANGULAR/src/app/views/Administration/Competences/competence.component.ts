import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { CandidateDto } from "../../candidats/CandidateDto";
import { Candidate } from "../../../models/Candidate";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { Technologie } from "../../../models/Technologie";
import { Origine } from "../../../models/Origine";
import { Competence } from "../../../models/Competence";
import { CodePostalService } from "../../../services/administrationService/code-postal.service";
import { CodePostal } from "../../../models/CodePostal";
import { Status } from "../../../models/enum/Status";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'competence.component.html',
  
})
export class competenceComponent implements OnInit {
  condidat: CandidateDto = new CandidateDto();
  candidatsFound: Array<CandidateDto> = []
  currentFile: any;
  pieceJoitesTemp = []
  candidate: Candidate;
  pdfSrc;
  technologies: Array<Technologie> = []
  origines: Array<Origine> = []
  competences: Array<Competence> = []
  codePostals: Array<CodePostal> = [];



  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,
    private notifierService:NotifierService,private competencesService:CompetencesService,private helperService:HelperService,
    private lieuxService:LieuxService,private utilisateurService: UtilisateurService,
    private codePostalService: CodePostalService) {}

  ngOnInit(): void {
    this.candidatsService.rechercheNouveauxcandidats(this.condidat,0,10).subscribe((data) => {
      this.candidatsFound = data.results
    })
    this.candidate= new Candidate();

    this.currentFile = {};
    this.pdfSrc = null;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
    this.competencesService.findAllCompetences().subscribe(data => {
      this.competences = data;
    })
    this.candidate.creePar.id = this.utilisateurService.getConnetedUserInfo().id


  }

 

  private uploadFiles(event) {
    for (let index = 0; index < event.target.files.length && index < 3; index++) {
      if (this.pieceJoitesTemp.length < 3) {
        const element = event.target.files[index];
        if (element.size < 131072000) {
          let alradyAdded = false;
          this.pieceJoitesTemp.forEach(el => {
            if (el.file.name == element.name) alradyAdded = true;
          })
          if (!alradyAdded)
            this.pieceJoitesTemp.push({ file: element, progress: 0, status: "notLoaded" });
          else
            this.notifierService.notify("warning", "Fichier \"" + element.name + "\" déja ajouter!")
        }
        else
          this.notifierService.notify("warning", "taille du fichier \"" + element.name + "\"est trop lourd!")
      }
    }
  }

  private uploadpieceJoitesTemp() {
    let tab = this.pieceJoitesTemp.filter(item => item.status == 'notLoaded')
    for (let index = 0; index < tab.length && index < 3; index++) {
      let element = tab[index];

      let reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          element.progress = ((e.loaded / e.total) * 100);
        }
      }

      reader.addEventListener("load", (e) => {
        // element.progress = 100
        var fileBase64Value = reader.result + ''
        this.currentFile.push({
          fileName: element.file.name,
          value: fileBase64Value.split(',')[1],
          type: element.file.type,
          size: element.file.size
        })
        element.status = "loaded"
      }, false);
      element.status = "uploading"
      reader.readAsDataURL(this.currentFile.file);
      console.log("currentFile "+this.currentFile.file);

    };

  }

  afficherPdf() {
    this.pieceJoitesTemp.forEach(el => {
      this.currentFile.name=el.file.name;
      this.currentFile.file=el.file;
    })
    this.candidate.nomCV = this.currentFile.name;
    var reader = new FileReader();
    reader.onload = (e) => {
      var fileBase64Value = reader.result + ''
      var file = {
        filename: this.currentFile.name,
        filetype: this.currentFile.file.type,
        value: fileBase64Value.split(',')[1],
        loginUser: this.utilisateurService.getConnetedUserInfo().login
      }
      this.candidatsService.uploadWordFile(file).subscribe(data => {
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + data.value)
      })
     
    }
    console.log("currentFile "+this.currentFile.file);

    reader.readAsDataURL(this.currentFile.file);
  }
  onSubmit() {
  this.saveCandidat();
  }

   saveCandidat(){
    this.candidate.dateInscription = new Date();
    this.candidate.statut = Status[Status.VIDE];
    this.candidate.entretien=null
    this.candidate.motif=null
  
    this.candidatsService.create(this.candidate, this.currentFile.file.type).toPromise().then((data: Candidate) => {
      if (data != null) {
        this.notifierService.notify("success", "Candidat ajouté avec succés !")
      } else {
        this.notifierService.notify("error", "Erreur l'ors l'ajour")
      }
    }
    )}

    codePostaleOnSearch(value) {
      if (value != "")
        this.codePostalService.completeCodePostal(value).subscribe(data => {
          data.forEach(element => {
            this.codePostals = [...  this.codePostals, element]
          });
        })
      else this.codePostals = []
    }

    downloadCV(candidat){
      this.candidatsService.getCvCandidats(candidat).subscribe(res => {
        let file = res;
          var url = window.URL.createObjectURL(file.data);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download =file.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element     
         
      })
    }
  

}
