import { DxTreeViewModule } from 'devextreme-angular';
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Candidate } from "../../../models/Candidate";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { CodePostalService } from "../../../services/administrationService/code-postal.service";
import { CodePostal } from "../../../models/CodePostal";
import { Technologie } from "../../../models/Technologie";
import { Origine } from "../../../models/Origine";
import { Competence } from "../../../models/Competence";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { Router } from "@angular/router";
import { Status } from "../../../models/enum/Status";
import { HelperService } from "../../../helper/helper.service";
import { NAVIGATION_RULES, PHONE_MASK } from "../../../helper/application.constant";
import { TablesComponent } from "../../base/tables.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Statut } from "../../../models/Statut";


@Component({
  templateUrl: 'candidats.component.html',
  styleUrls: ["candidats.component.css"]
})
export class CandidatsComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {

    this.candidatsService.folders = this.folders;
    //this.candidatsService.destroyTempoFolder(this.utilisateurService.getConnetedUserInfo().login).subscribe();
  }
  regex = new RegExp('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$');
  regex2 = new RegExp('^[a-zA-Z]+$');
  loading = false;
  civilites = ["M", "Mme"];
  candidate: Candidate;
  codePostals: Array<CodePostal> = [];
  technologies: Array<Technologie> = [];
  origines: Array<Origine> = [];
  competences: Array<Competence> = [];
  candidatsFound: Array<Candidate> = [];
  candidateFound: boolean;
  pdfSrc;
  folders;
  currentFile: any;
  listNomCvs = []
  allFiles = []
  mask: any[] = PHONE_MASK;
  verif:boolean;
  verif_code:boolean

  constructor(private router: Router, private utilisateurService: UtilisateurService, private codePostalService: CodePostalService, private originesService: OriginesService, private technologiesService: TechnologieService,
    private sanitizer: DomSanitizer, private candidatsService: CandidatsService, private helperService: HelperService,
    private notifierService: NotifierService, private competencesService: CompetencesService, private formBuilder: FormBuilder) {
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

    this.candidate = new Candidate();
    this.candidateFound = false
    this.candidate.creePar.id = this.utilisateurService.getConnetedUserInfo().id
    this.folders = this.candidatsService.folders;
    this.currentFile = {};
    this.pdfSrc = null;
    if ((this.utilisateurService.getConnetedUserInfo().profil.libelle == "Sourceur") || (this.utilisateurService.getConnetedUserInfo().profil.libelle =="Profil spécial"))
  this.verif=false;
  else this.verif=true;
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
        icon: "assets/img/tree/pdf-icon-round.png"
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
          icon: "assets/img/tree/iconfinder_folder.png"
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
    e.node.itemData.icon = "assets/img/tree/Icons_open.png"
  }
  onItemCollapsed(e) {
    e.node.itemData.icon = "assets/img/tree/iconfinder_folder.png"
  }
  //#endregion
  deletefile() {
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
      this.candidatsService.deletewordfile(file).subscribe(data => {
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + data.value)
      })
    }
    reader.readAsDataURL(this.currentFile.file);
  }

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
    if (!this.regex.test(this.candidate.nom) && !this.regex.test(this.candidate.prenom)) {
      this.notifierService.notify("error", "Les champs de saisi «Nom» est «Prenom» sont invalides")
    }
    else {
      if (this.candidate.nom == "" || this.candidate.prenom == "" || this.candidate.nom == undefined || this.candidate.prenom == undefined) {
        this.notifierService.notify("info", "Il faut remplir au moins Nom et Prénom")
      }
      else if (!this.regex.test(this.candidate.nom)) {

        {
          this.notifierService.notify("error", "Le champ de saisi « Nom » est invalide")
        }
      }
      else if (!this.regex.test(this.candidate.prenom)) {
        this.notifierService.notify("error", "Le champ de saisi « Prenom » est invalide")
      }
      else {
        var candidateTemp = {
          nom: this.candidate.nom,
          prenom: this.candidate.prenom,
          email: this.candidate.email,
          numeroTel: this.candidate.numeroTel
        }
        this.candidatsService.rechercheAjoutNouveauxcandidats(candidateTemp, 0, 0).subscribe((data) => {
          this.candidatsFound = data.results
          this.notifierService.notify("info", "Nombre Candidat : " + data.total)

        })
      }
    }
  }

  codePostaleOnSearch(value) {
    this.verif_code = true;
    if (value != "")
      this.codePostalService.completeCodePostal(value).subscribe(data => {
        data.forEach(element => {
          this.codePostals.forEach(reg => {
            if (element.code === reg.code) {
              this.verif_code = false;
            }
          })
    
          if (this.verif_code == true)
          this.codePostals = [element, ...  this.codePostals]
        });
      })
    else this.codePostals = []
  
  
  }



  async  onSubmit() {

    let fn = (e) => {
      this.annuler()
    }
    await this.saveCandidat(fn)

  }

  annuler() {
    this.router.navigateByUrl(NAVIGATION_RULES.dashboard.url, { skipLocationChange: true }).then(() =>
      this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.newCancidat]));
  }

  async  submitAndRedirect() {
    let fn = (id) => {
      this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.details.replace(':id', id)]);
    }
    this.regex = this.regex2;
    await this.saveCandidat(fn)
  }

  async saveCandidat(callback) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loading = true;
    var error = false;
    //#region get Competences
    this.helperService.generateComp(this.candidate, this.competences);

    //#endregion

    //#region  allert Message
    if (this.candidate.nom == "" || this.candidate.nom == undefined || !this.regex.test(this.candidate.nom)) {
      this.notifierService.notify("error", " Écrivez un nom valide");
      error = true;
    }
    if (this.candidate.prenom == "" || this.candidate.prenom == undefined || !this.regex.test(this.candidate.prenom)) {
      this.notifierService.notify("error", " Écrivez un prenom valide")
      error = true;
    }
    if (!this.candidate.cvAnonyme) {
      if (this.candidate.email == "" || this.candidate.email == undefined || !validEmailRegEx.test(this.candidate.email)) {
        this.notifierService.notify("error", " Écrivez un email valide")
        error = true;
      }
      else {
        let cand
        await this.candidatsService.getCandidatByEmail(this.candidate.email).toPromise().then(data => {
          cand = data
        });
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
        await this.candidatsService.getCandidatByNumTel(this.candidate.numeroTel).toPromise().then(data => { cand = data });
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
      this.candidate.statut.libelle = "Vide"
      this.candidate.statut.id = 2
      this.candidate.entretien = null
      this.candidate.motif = null
      console.log(this.candidate.candidatCompetence)
      this.candidatsService.create(this.candidate, this.currentFile.file.type).toPromise().then((data: Candidate) => {
        if (data != null) {
          this.notifierService.notify("success", "Candidat ajouté avec succés !")
          this.deletefile()
          this.loading = false;
          callback(data.id)
        } else {
          this.notifierService.notify("error", "Erreur l'ors l'ajour")
        }
      }, error => {
        this.notifierService.notify("error", "Erreur l'ors l'ajour")
      })
    }
    this.loading = false;
  }

}
