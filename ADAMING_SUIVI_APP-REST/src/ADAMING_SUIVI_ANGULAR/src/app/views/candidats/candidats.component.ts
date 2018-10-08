import { Component, OnInit, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Candidate } from "../../models/Candidate";
import { CandidatsService } from "../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../services/administrationService/origines.service";
import { CompetencesService } from "../../services/administrationService/competences.service";
import { TechnologieService } from "../../services/administrationService/TechnologieService";
import { CodePostalService } from "../../services/administrationService/code-postal.service";
import { CodePostal } from "../../models/CodePostal";
import { Technologie } from "../../models/Technologie";
import { Origine } from "../../models/Origine";
import { Competence } from "../../models/Competence";
import { USER_NAME } from "../../helper/auth.constant";
import { UtilisateurService } from "../../services/utilisateur.service";
import { Router } from "@angular/router";
import { Status } from "../../models/enum/Status";

@Component({
  templateUrl: 'candidats.component.html',
  styleUrls: ["candidats.component.css"]
})
export class CandidatsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.candidatsService.folders = this.folders;
  }

  candidate: Candidate;
  codePostals: Array<CodePostal> = [];
  technologies: Array<Technologie> = []
  origines: Array<Origine> = []
  competences: Array<Competence> = []
  candidatsFound: Array<Candidate> = []
  candidateFound: boolean;
  pdfSrc;
  folders;
  currentFile: any;
  listNomCvs = []
  allFiles = []

  constructor(private router:Router,private utilisateurService: UtilisateurService, private codePostalService: CodePostalService, private originesService: OriginesService, private technologiesService: TechnologieService,
    private sanitizer: DomSanitizer, private candidatsService: CandidatsService,
    private notifierService: NotifierService, private competencesService: CompetencesService) {
  }

  ngOnInit(): void {
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
    this.competencesService.findAllCompetences().subscribe(data => {
      this.competences = data;
    })
    this.candidatsService.getListNomCvs().subscribe(data => {
      this.listNomCvs = data;
      this.folders = this.folders.filter(element => {
        return this.listNomCvs.indexOf(element.name) == -1
      });
    })

   this.candidate= new Candidate();
   this.candidateFound=false
    this.candidate.creePar.id = this.utilisateurService.getConnetedUserInfo().id
    this.folders = this.candidatsService.folders;
  
    this.currentFile = {};
    this.pdfSrc = null
  }


  //#region Tree Setting
  selectItem(e) {
    if (e.itemData.type == "file")
      this.currentFile = e.itemData;
  }
  uploadFiles(event) {
    if (event.target.files && event.target.files.length) {
      this.allFiles = event.target.files
      this.createFilesStructure(event.target.files)
    }
  }
  createFilesStructure(files) {
    var structure = []
    var filteredfiles = []
    Array.from(files).forEach((element: any) => {
      if ((element.type == "application/pdf" || element.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        || element.type == "application/msword"
        || element.type == "application/octet-stream") && this.listNomCvs.indexOf(element.name) == -1)

        filteredfiles.push(element)
    });

    structure = this.generateParentFolder(filteredfiles);

    Array.from(filteredfiles).forEach((element: any) => {
      let categoryId = element.webkitRelativePath.split('/')
      categoryId.pop()
      structure.push({
        name: element.name,
        file: element,
        ID: element.webkitRelativePath.split('/').join('_'),
        categoryId: categoryId.join('_'),
        expanded: false,
        type: 'file',
        icon: "assets/img/tree/file-pdf-regular.svg"
      })
    });
    this.folders = structure;
  }
  generateParentFolder(files) {
    var structure = []
    Array.from(files).forEach((element: any) => {
      element.webkitRelativePath.replace("_", "UnderReplaced")
      let ID = element.webkitRelativePath.split('/')
      while (ID.length > 1) {
        ID.pop()
        var node = {
          name: ID[ID.length - 1].replace("UnderReplaced", "_"),
          ID: ID.join('_'),
          file: element,
          expanded: false,
          type: 'folder',
          icon: "assets/img/tree/folder-solid.svg"
        }
        if (ID.length > 1) {
          let tempId = []
          ID.forEach(element => {
            tempId.push(element)
          });
          tempId.pop()
          node['categoryId'] = tempId.join('_')
        }
        structure.push(node)
      }
    });


    var tempAray = []
    structure.forEach(element => {
      var inTable = false;
      tempAray.forEach(element1 => {
        if (element.ID == element1.ID)
          inTable = true;
      });
      if (!inTable) tempAray.push(element)
    });
    return tempAray;

  }
  onItemExpanded(e) {
    e.node.itemData.icon = "assets/img/tree/folder-open-solid.svg"
  }
  onItemCollapsed(e) {
    e.node.itemData.icon = "assets/img/tree/folder-solid.svg"
  }
  //#endregion

  afficherPdf() {
    this.candidate.nomCV = this.currentFile.name
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
    reader.readAsDataURL(this.currentFile.file);
  }

  recherchecandidate() {
    this.candidateFound = true;
    if (this.candidate.nom == "" || this.candidate.prenom == "" || this.candidate.nom == undefined || this.candidate.prenom == undefined) {
      this.notifierService.notify("info", "Il faut remplir au moins Nom et Prénom")
    } else {
      var candidateTemp = {
        nom: this.candidate.nom,
        prenom: this.candidate.prenom,
        email: this.candidate.email,
        numeroTel: this.candidate.numeroTel
      }
      this.candidatsService.rechercheNouveauxcandidats(candidateTemp,0,0).subscribe((data) => {
        this.candidatsFound = data
        this.notifierService.notify("info", "Nombre Candidat : " + data.length)

      })
    }
  }

  codePostaleOnSearch(value) {
    if (value != "")
      this.codePostalService.completeCodePostal(value).subscribe(data => {
        data.forEach(element => {
          this.codePostals = [...  this.codePostals, element]
        });
      })
    else this.codePostals = []
  }

  async onSubmit() {
    let fn =(e)=>{
      this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
      this.router.navigate(["candidats"]));
    }
  await this.saveCandidat(fn)
  }
  annuler(){
    this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
    this.router.navigate(["candidats"]));
  }

  async submitAndRedirect(){
    let fn =(id)=>{
      this.router.navigate(["/candidats/details/"+id]);
    }
    await this.saveCandidat(fn)
  }

  async saveCandidat(callback){
    var error = false;
    //#region get Competences
    this.competences.forEach((obj, i) => {
      if (obj.selected) {
        delete obj.selected;
        this.candidate.candidatCompetence.push({
          pk: {
            competence: obj,
          }
        })
      }
    });
    //#endregion

    //#region  allert Message
    if (this.candidate.nom == "" || this.candidate.nom == undefined) {
      this.notifierService.notify("error", " Écrivez un nom valide")
      error = true;
    }
    if (this.candidate.prenom == "" || this.candidate.prenom == undefined) {
      this.notifierService.notify("error", " Écrivez un prenom valide")
      error = true;
    }
    if (!this.candidate.cvAnonyme) {
      if (this.candidate.email == "" || this.candidate.email == undefined) {
        this.notifierService.notify("error", " Écrivez un email valide")
        error = true;
      }
      else {
        let cand
        await this.candidatsService.getCandidatByEmail(this.candidate.email).toPromise().then(data => { cand = data });;
        if (cand != null) {
          this.notifierService.notify("error", "Email existe déjà  !")
          error = true;
        }
      }
      if (this.candidate.numeroTel == "" || this.candidate.numeroTel == undefined) {
        this.notifierService.notify("error", " Écrivez un numero Tel valide")
        error = true;
      }
      else {
        let cand
        await this.candidatsService.getCandidatByNumTel(this.candidate.numeroTel).toPromise().then(data => { cand = data });;
        if (cand != null) {
          this.notifierService.notify("error", "Numéro de téléphone existe déjà  !")
          error = true;
        }
      }
    }
    else {
      if ((this.candidate.email == "" || this.candidate.email == undefined) && (this.candidate.numeroTel == "" || this.candidate.numeroTel == undefined)) {
        this.notifierService.notify("error", " Écrivez un email  ou numero Tel  valide")
        error = true;
      } else {
        if (this.candidate.email != "" && this.candidate.email != undefined) {
          let cand
          await this.candidatsService.getCandidatByEmail(this.candidate.email).toPromise().then(data => { cand = data; });
          if (cand != null) {
            this.notifierService.notify("error", "Email existe déjà  !")
            error = true;
          }
        }
        if (this.candidate.numeroTel != "" && this.candidate.numeroTel != undefined) {
          let cand;
          await this.candidatsService.getCandidatByNumTel(this.candidate.numeroTel).toPromise().then(data => { cand = data });;
          if (cand != null) {
            this.notifierService.notify("error", "Numéro de téléphone existe déjà  !")
            error = true;
          }
        }
      }
    }
    if (this.candidate.technologie.id == undefined) {
      this.notifierService.notify("error", " Choisir un Profil")
      error = true;
    }
    if (this.candidate.origine.id == undefined) {
      this.notifierService.notify("error", " Choisir un Origine CV")
      error = true;
    }
    if (this.candidate.codePostal == null || this.candidate.codePostal == undefined) {
      this.notifierService.notify("error", " Écrivez un Code Postal valide")
      error = true;
    }
    //#endregion

    if (!error) {
      this.candidate.dateInscription = new Date();
      this.candidate.statut = Status[Status.VIDE];
      this.candidate.entretien=null
      this.candidate.motif=null
      this.candidatsService.create(this.candidate, this.currentFile.file.type).toPromise().then((data: Candidate) => {
        if (data != null) {
          this.notifierService.notify("success", "Candidat ajouté avec succés !")
          callback(data.id) 
        } else {
          this.notifierService.notify("error", "Erreur l'ors l'ajour")
        }
      }, error => {
        this.notifierService.notify("error", "Erreur l'ors l'ajour")
      })
    }
  }
}
