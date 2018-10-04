import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Entretien } from '../../../models/Entretien';
import { Lieu } from '../../../models/Lieu';
import { LieuxService } from '../../../services/administrationService/Lieux.service.';
import { NotifierService } from 'angular-notifier';
import { Motif } from '../../../models/Motif';
import { MotifService } from '../../../services/administrationService/motif.service';
import { RoutingState } from '../../../helper/routing-state.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Disponibilite } from '../../../models/enum/Disponibilite';
import { HelperService } from '../../../helper/helper.service';
import { Profil } from '../../../models/enum/Profil';
import { EntretienService } from '../../../services/entretien-service';
import { Status } from '../../../models/enum/Status';

@Component({
  selector: 'app-fiche-candidat',
  templateUrl: './fiche-candidat.component.html',
  styleUrls: ['./fiche-candidat.component.scss']

})
export class FicheCandidatComponent implements OnInit {


  @ViewChild("emailModalDispo")
  public emailModalDispo;

  @ViewChild("emailModalHorCible")
  public emailModalHorCible;

  commentaireMotif = "";
  minRelance = new Date();
  timeEntretien: Date;
  codePostals: Array<CodePostal> = [];
  technologies: Array<Technologie> = []
  origines: Array<Origine> = []
  competences: Array<Competence> = []
  lieux: Array<Lieu> = []
  motifs: Array<Motif> = []

  pertinenecesValeurs = [1, 2, 3, 4, 5]
  pdfSource;
  refDisponibilite = this.helperService.buildDisponibiliteArray();
  file;
  currentCandidat: Candidate;
  envoiMail: boolean = false;
  pieceJoitesTemp = []
  emailEntrtien = {
    candidat: {},
    distCopie: ["", ""],
    pieceJoites: [],
    msg: ""

  }

  constructor(private route: ActivatedRoute, private competencesService: CompetencesService,
    private codePostalService: CodePostalService, private originesService: OriginesService,
    private technologiesService: TechnologieService, private candidatsService: CandidatsService,
    private sanitizer: DomSanitizer, private router: Router, private lieuxService: LieuxService,
    private notifierService: NotifierService, private motifService: MotifService,
    private routingState: RoutingState, private entretienService: EntretienService,
    private userService: UtilisateurService, private helperService: HelperService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { candidat: Candidate, title: string }) => {
        data.title = data.title + data.candidat.id;
        this.currentCandidat = data.candidat;
        if (this.currentCandidat.entretien != undefined && this.currentCandidat.entretien != null)
          this.timeEntretien = this.currentCandidat.entretien.date;
        this.codePostaleOnSearch(this.currentCandidat.codePostal.code)
        this.candidatsService.getCvCandidats(this.currentCandidat).subscribe(res => {
          this.file = res;
          var reader = new FileReader();
          reader.onload = (e) => {
            var fileBase64Value = reader.result + ''
            this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl(fileBase64Value.replace("pdf/plain", "application/pdf"))
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

    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })

    this.motifService.findAllMotifs().subscribe(data => this.motifs = data)

    this.competencesService.findAllCompetences().subscribe(data => {
      this.competences = data;
      this.currentCandidat.candidatCompetence.forEach((obj, i) => {
        this.competences.forEach((obj2, i) => {
          if (obj2.id == obj.pk.competence.id) {
            obj2.selected = true;
          }
        });
      });
    })
  }

  private codePostaleOnSearch(value) {
    if (value != "")
      this.codePostalService.completeCodePostal(value).subscribe(data => {
        data.forEach(element => {
          this.codePostals = [...  this.codePostals, element]
          if (element.id == this.currentCandidat.codePostal.id) {
            this.currentCandidat.codePostal = element
          }
        });

      })
    else this.codePostals = []
  }

  private downloadPDF() {

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

  private afterHeurePickerClosed() {
    if (this.timeEntretien == undefined) {
      this.notifierService.notify("error", "Heure incorrect: l’heure doit être entre 09h et 18h")

    }
    else this.currentCandidat.entretien.date.setHours(this.timeEntretien.getHours(), this.timeEntretien.getMinutes())
  }

  private entretienHeureFilter = (d: Date): boolean => {
    if (d.getHours() < 18 && d.getHours() >= 9) {
      return true
    }
    else {
      return false;
    }
  }

  private annuler() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }

  private updateDateObtentionDiplome(date: Date) {
    this.currentCandidat.dateObtentionDiplome = date
  }

  private updateCandidats() {
    let errorCv = this.verifierCvAnym();
    if (!errorCv) {
      //#region get Competences
      this.generateComp();
      //#endregion
      const candidateTemp: any = Object.assign({}, this.currentCandidat);
      candidateTemp.entretien = null
      candidateTemp.motif = null
      this.candidatsService.updateCandidat(candidateTemp).subscribe(data => {
        this.notifierService.notify("success", "Candidat modifié avec success !")
        this.router.navigate(["/listeNouveauxCandidats"]);

      })
    }
  }

  private generateComp() {
    this.competences.forEach((obj, i) => {
      if (obj.selected) {
        //delete obj.selected;
        this.currentCandidat.candidatCompetence.push({
          pk: {
            competence: obj,
          }
        });
      }
    });
  }

  private verifierCvAnym() {
    let error = false;
    //#region cvAnonyme
    if (!this.currentCandidat.cvAnonyme) {
      if (this.currentCandidat.email == "" || this.currentCandidat.email == undefined) {
        this.notifierService.notify("error", " Écrivez un email valide");
        error = true;
      }
      if (this.currentCandidat.numeroTel == "" || this.currentCandidat.numeroTel == undefined) {
        this.notifierService.notify("error", " Écrivez un numero Tel valide");
        error = true;
      }
    }
    else {
      if ((this.currentCandidat.email == "" || this.currentCandidat.email == undefined) && (this.currentCandidat.numeroTel == "" || this.currentCandidat.numeroTel == undefined)) {
        this.notifierService.notify("error", " Écrivez un email  ou numero Tel  valide");
        error = true;
      }
    }
    return error;
    //#endregion

  }

  private verfierDispo() {
    let error = false;
    if (this.currentCandidat.entretien.pertinence == undefined) {
      this.notifierService.notify("error", " Champ obligatoire,choisir la pertinence!")
      error = true;
    }
    if (this.currentCandidat.entretien.disponible == undefined) {
      this.notifierService.notify("error", "Champ obligatoire,choisir la disponibilité!")
      error = true;
    }
    return error;
  }

  private verfierRelance() {
    let error = false;

    if (!(this.currentCandidat.entretien.pertinence == undefined)) {

      var table = ["PREAVIS", "message_vocal", "envoi_de_la_plaquette", "EN_ATTENTE_FORMATION", "mail_envoye"]
      let dispoValue = this.currentCandidat.entretien.disponible;
      //#region Relance
      if (table.indexOf(dispoValue) >= 0 && this.currentCandidat.entretien.relance == undefined) {
        this.notifierService.notify("error", "Champs obligatoire, Relancer")
        error = true;
      } else if (this.currentCandidat.entretien.relance == true && this.currentCandidat.entretien.dateRelance == undefined) {
        this.notifierService.notify("error", "Champ obligatoire, date relance!")
        error = true;
      }
      else if (this.currentCandidat.entretien.relance == false && this.currentCandidat.entretien.dateRelance != undefined) {
        this.currentCandidat.entretien.dateRelance = null
      }
    }
    return error;
    //#endregion
  }

  private verfierEntrtien() {
    let error = false

    if (!(this.currentCandidat.entretien.pertinence == undefined)) {

      //#region Entrtien
      let dispoValue = this.currentCandidat.entretien.disponible;

      if (dispoValue == "DISPONIBLE") {
        if (this.currentCandidat.entretien.date == undefined) {
          this.notifierService.notify("error", "Champs obligatoire, date entretien!")
          error = true;
        }
        if (this.currentCandidat.entretien.lieu == undefined) {
          this.notifierService.notify("error", "Champs obligatoire, lieu entretien!")
          error = true;
        }
        if (this.timeEntretien == undefined) {
          this.notifierService.notify("error", "Champs obligatoire, heure d'entretien!")
          error = true;
        }
      }
    }
    return error;
    //#endregion
  }

  relanceHandleChange(event) {
    if (this.currentCandidat.entretien.relance == false) {
      this.currentCandidat.entretien.dateRelance = undefined
    }
    else {
      this.currentCandidat.entretien.date = undefined
    }
  }

  private async sauvgarderFiche() {
    //#region get Competences
    this.generateComp();
    //#endregion
    if (!this.verfierDispo() && !this.verfierRelance() && !this.verfierEntrtien()) {
      //#region Hors Cible 
      if (this.currentCandidat.entretien.disponible == "hors_cible" && (this.currentCandidat.emailSourceurEnvoyer == false || this.currentCandidat.emailSourceurEnvoyer == null)) {
        this.emailModalHorCible.show()
        return;
      }
      //#endregion
      //#region envoiMail
      if (this.envoiMail) {
        if (this.currentCandidat.entretien.disponible == "DISPONIBLE" && (this.currentCandidat.emailCandidatEnvoyer == null || this.currentCandidat.emailCandidatEnvoyer == false)) {
          this.emailEntrtien.candidat = this.currentCandidat
          this.emailEntrtien.msg = this.buildEntretienMsg(this.currentCandidat)
          this.emailModalDispo.show()
          return;
        }
      }
      //#endregion
      let userProfil = this.userService.getConnetedUserInfo().profil;
      if (Profil[userProfil] == Profil.ADMINISTRATEUR || Profil[userProfil] == Profil.CHARGE || Profil[userProfil] == Profil.DIRECTION) {
        //#region Save Or Update Entretien
        this.currentCandidat.entretien.charge = this.userService.getConnetedUserInfo();
        await this.entretienService.createOrUpdate(this.currentCandidat.entretien).toPromise().then((data: Entretien) => {
          if (this.currentCandidat.entretien.id > 0)
            this.notifierService.notify("success", "Modifié!, Candidat modifié avec success !");
          else
            this.notifierService.notify("success", "Ajout!, Candidat ajouté avec success !");
          data.date = new Date(data.date)
          this.currentCandidat.entretien = data;
        })
        //#endregion
        //#region  Update Candidat
        if (this.currentCandidat.entretien.date == undefined || this.currentCandidat.entretien.date == null) {
          this.currentCandidat.statut = Status[Status.EN_ATTENTE_EVALUATION]
        }
        if (Disponibilite[this.currentCandidat.entretien.disponible] != Disponibilite.DISPONIBLE) {
          this.currentCandidat.statut = Status[Status.VIDE]
        }
        this.currentCandidat.motif = null;
        await this.candidatsService.updateCandidat(this.currentCandidat).toPromise().then(data => {
        })
        //#endregion
      }
      this.annuler()
    }
  }

  private envoiMailHorCibleFunction() {
    if (this.currentCandidat.motif != undefined && this.currentCandidat.motif != undefined && this.commentaireMotif != "") {
      this.candidatsService.envoyerEmailHorsCibleCandidats(this.currentCandidat, this.userService.getConnetedUserInfo().login, this.commentaireMotif).subscribe(data => {
        this.notifierService.notify("success", "Mail envoyer avec success");
        this.currentCandidat.motif = new Motif();
        this.commentaireMotif = ""
        this.emailModalHorCible.hide();
        this.currentCandidat.emailSourceurEnvoyer = true;
        this.sauvgarderFiche();
      })
    }
    else {
      this.notifierService.notify("error", "Champs obligatoire, Choisir un motif!")

    }
  }

  private envoiMailDispoFunction() {
    this.candidatsService.envoyerEmailDisboCandidats(this.emailEntrtien, this.userService.getConnetedUserInfo().login).subscribe(data => {
      this.notifierService.notify("success", "Mail envoyer avec success");
      this.currentCandidat.emailCandidatEnvoyer = true;
      this.emailModalDispo.hide();
      this.emailEntrtien = {
        candidat: {},
        distCopie: ["", ""],
        pieceJoites: [],
        msg: ""

      }
      this.pieceJoitesTemp = []
      this.sauvgarderFiche();
    })
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
        this.emailEntrtien.pieceJoites.push({
          fileName: element.file.name,
          value: fileBase64Value.split(',')[1],
          type: element.file.type,
          size: element.file.size
        })
        element.status = "loaded"
      }, false);
      element.status = "uploading"
      reader.readAsDataURL(element.file);
    };

  }

  private disableUploadButton() {
    return this.pieceJoitesTemp.filter(item => item.status == 'notLoaded').length == 0 || this.pieceJoitesTemp.filter(item => item.status == 'uploading').length > 0
  }

  private removeUploadedFile(item) {
    this.pieceJoitesTemp.splice(this.pieceJoitesTemp.indexOf(item, 0), 1)
    this.emailEntrtien.pieceJoites.forEach((element, index) => {
      if (element.fileName == item.file.name) {
        this.emailEntrtien.pieceJoites.splice(index, 1)
        return;
      }
    });
  }

  private buildEntretienMsg(candidat) {

    let presentationTime = new Date(candidat.entretien.date);
    presentationTime.setHours(presentationTime.getHours() + 1)
    let entretienTime = new Date(candidat.entretien.date);
    entretienTime.setHours(entretienTime.getHours() + 2)
    var msg = "Bonjour " + candidat.civilite + ". " + candidat.nom.toUpperCase() + " " + candidat.prenom.toUpperCase()
      + ", \n\nSuite à notre entretien téléphonique : \n\nJe vous confirme donc votre entretien le ";

    msg += candidat.entretien.date.toLocaleDateString("fr-FR") + " à " + this.helperService.formatTime(candidat.entretien.date) + " dans nos locaux situés:\n\n"
      + candidat.entretien.lieu.adresseAdaming
      + "\n\nLe déroulement sera le suivant: \n\n\t " + this.helperService.formatTime(candidat.entretien.date)
      + ": Test de logique \n\t " + this.helperService.formatTime(presentationTime)
      + ": Présentation de notre société et opportunités de carrière \n\t"
      + this.helperService.formatTime(entretienTime)
      + ": Entretien individuel \n\nMerci de bien vouloir me confirmer votre présence par retour de mail. \n \n Ce rendez-vous a pour but d'intégrer notre société en contrat à durée indéterminée dans l'hypothèse où vos tests et entretiens sont concluants. \n\n Cordialement,";

    return msg
  }

}
