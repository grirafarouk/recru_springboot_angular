import { Disponibilite } from './../../../models/Disponibilite';
//import { Disponibilite } from './../../../models/enum/Disponibilite';
import { disponibiliteService } from './../../../services/administrationService/disponibiliteService';
import { StatutService } from './../../../services/administrationService/StatutService';
import { Statut } from './../../../models/Statut';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../../models/Candidate';
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
import { RoutingState } from '../../../helper/routing-state.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { HelperService } from '../../../helper/helper.service';
import { EntretienService } from '../../../services/entretien-service';
import { Status } from '../../../models/enum/Status';
import { SessionFormation } from '../../../models/SessionFormation';
import { SessionsFormationsService } from '../../../services/sessionService/sessions-formations.service';
import { RegionService } from '../../../services/administrationService/region.service';
import { formatDate } from '@angular/common';
import { SuiviService } from '../../../services/suivi-service';
import { Suivi } from '../../../models/Suivi';
import { NAVIGATION_RULES, PHONE_MASK, USER_ROLE } from '../../../helper/application.constant';
declare var jQuery: any;
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from
  '@angular/forms';
@Component({
  selector: 'app-fiche-entrtien',
  templateUrl: './fiche-entrtien.component.html',
  styleUrls: ['./fiche-entrtien.component.scss']

})
export class FicheEntrtienComponent implements OnInit {

  @ViewChild("regionFranceModal")
  public regionFranceModal;

  enableSave = false;
  map: any;
  regions: Array<string> = [];
  sessionFormations: Array<SessionFormation> = [];
  commentaireMotif = "";
  minRelance = new Date();
  timeEntretien: Date;
  codePostals: Array<CodePostal> = [];
  technologies: Array<Technologie> = []
  origines: Array<Origine> = [];
  competences: Array<Competence> = []
  disponibleListe: Array<Disponibilite> = []
  lieux: Array<Lieu> = []
  statuts: Array<Statut> = []

  pertinenecesValeurs = [1, 2, 3, 4, 5]
  pdfSource;
  refStatus = this.helperService.buildStatutArray();
  //refDisponibilite = this.helperService.buildDisponibiliteArray();
  file;
  currentCandidat: Candidate;
  mask: any[] = PHONE_MASK;
  currentDate = new Date();
  currenttime: any;
  evaluationtime: any;
  disabledtime = false;


  myForm = new FormGroup({}) // Instantiating our form

  get f() { return this.myForm.controls; }


  constructor(private route: ActivatedRoute, private competencesService: CompetencesService,
    private suiviService: SuiviService,
    private codePostalService: CodePostalService, private originesService: OriginesService,
    private technologiesService: TechnologieService, private candidatsService: CandidatsService,
    private sanitizer: DomSanitizer, private router: Router, private lieuxService: LieuxService,
    private notifierService: NotifierService,
    private routingState: RoutingState, private disponibiliteService: disponibiliteService, private entretienService: EntretienService, private regionService: RegionService,
    private userService: UtilisateurService, private statutservice: StatutService, public helperService: HelperService, private sessionsFormationsService: SessionsFormationsService,
    private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      publishedYear: ['', [Validators.min(0), Validators.max(45)]]
    });
  }

  ngOnInit() {
    let role = this.userService.getConnetedUserInfo().profil.libelle;
    this.enableSave = role == USER_ROLE.ADMINISTRATEUR || role == USER_ROLE.CHARGE || role == USER_ROLE.DIRECTION

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
    this.disponibiliteService.findAllDisponibilite().subscribe(data => {

      this.disponibleListe = data;
    }
    )
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.statutservice.findAllStatut().subscribe(data => {
      this.statuts = data;
    }
    )
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })

    this.regionService.findAllRegion().subscribe(data => {
      this.regions = data;
    })

    this.sessionsFormationsService.getsessionFormationEnCours({}).subscribe(data => {
      data.forEach(element => {
        element.itemLabel = element.formation.code + " - " + formatDate(element.dateDemarrage, "d/M/yyyy", "en")

        element.dateDemarrage = new Date(element.dateDemarrage)
        element.dateFin = new Date(element.dateFin)
      });
      this.sessionFormations = data;
    })

    this.competencesService.findAllCompetences().subscribe(data => {
      this.competences = data;
      this.currentCandidat.candidatCompetence.forEach((obj, i) => {
        this.competences.forEach((obj2, i) => {
          if (obj2.id == obj.id) {
            obj2.selected = true;
          }
        });
      });
    })
    this.testDisabled();
  }

  private testDisabled() {
    this.evaluationtime = this.currentCandidat.entretien.date.getHours() + ":" + this.currentCandidat.entretien.date.getMinutes();
    this.currenttime = this.currentDate.getHours() + ":" + this.currentDate.getMinutes();

    if (this.timeEntretien.toLocaleDateString("fr-FR") == this.currentDate.toLocaleDateString("fr-FR")
      && (this.evaluationtime > this.currenttime)) { this.disabledtime = true; }
    else { this.disabledtime = false; }
  }

  codePostaleOnSearch(value) {
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

  downloadPDF() {

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

  afterHeurePickerClosed() {
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

  annuler() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }

  updateDateObtentionDiplome(date: Date) {
    this.currentCandidat.dateObtentionDiplome = date
  }

  ratingComponentClick(clickObj: any) {
    this.currentCandidat.suivi[clickObj.name] = clickObj.rating;
  }

  private verfierStatus() {
    let error = false;
    if (this.currentCandidat.statut.libelle == "Valide" && (this.currentCandidat.sessionFormation == null || this.currentCandidat.sessionFormation == undefined)) {
      this.notifierService.notify("error", " Champ obligatoire,Affectation candidat pour une session de fromation !")
      error = true;
    }
    return error;
  }

  private verfierSuivinoteResultat() {

    let error = false;

    if (this.currentCandidat.suivi.noteResultat < 0 || this.currentCandidat.suivi.noteResultat > 45 || this.currentCandidat.suivi.noteResultat == null) {
      this.notifierService.notify("error", "Résultat du test n’est pas compris entre les valeurs attendues 0 et 45.")
      error = true;
    }
    return error;
    //#endregion
  }

  private verfierSuiviRelance() {
    let error = false;

    if (this.currentCandidat.suivi.relance && this.currentCandidat.suivi.dateRelance == undefined) {
      this.notifierService.notify("error", "Champ obligatoire, Date relance dépend  Relancer !")
      error = true;
    }

    return error;
    //#endregion
  }


  ngAfterViewInit() {
    this.map = jQuery('#france-map').vectorMap({
      map: 'fr_regions_mill',
      hoverOpacity: 0.5,
      hoverColor: "#EC0000",
      backgroundColor: "#ffffff",
      color: "#FACC2E",
      borderColor: "#000000",
      selectedColor: "#EC0000",
      multiSelectRegion: true,
      enableZoom: true,
      showTooltip: true,
    });
  }

  selectionnerTousRegion() {
    this.map.selectAllRegions();
  }

  validerRegion() {
    var selectedRegions = []
    this.map.selectedRegions.forEach(element => {
      var itemFound = this.regions.find((e: any) => {
        return e.id == element;
      })
      if (itemFound != undefined) selectedRegions.push(itemFound);
    });
    this.currentCandidat.suivi.regions = selectedRegions;
    this.regionFranceModal.hide();
  }
  openRegionsDialog() {
    let disabled: boolean;
    disabled = this.disabledtime;
    if (this.disabledtime)
      disabled = false;
    else disabled = true;
    if (disabled)
      this.openRegionsDialogefrance();


  }
  openRegionsDialogefrance() {

    var selectedRegions = []
    if (this.currentCandidat.suivi.regions != undefined) this.currentCandidat.suivi.regions.forEach(element => {
      selectedRegions.push(element.id + "");
    });
    this.map.setSelectedRegions(selectedRegions);
    this.regionFranceModal.show();

  }


  numberOnly(): boolean {
    if (this.currentCandidat.suivi.noteResultat <= 45 && this.currentCandidat.suivi.noteResultat >= 0) {
      return true;
    } else {
      this.notifierService.notify("error", "Résultat du test n’est pas compris entre les valeurs attendues 0 et 45.")
      return false;
    }

  }

  async sauvgarderFicheEntrtien() {
    var error = false;
    if (this.currentCandidat.suivi.notePresentation == undefined) {
      this.notifierService.notify("error", " Présentation champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.noteSavoir == undefined) {
      this.notifierService.notify("error", " Savoir etre champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.noteFiabilite == undefined) {
      this.notifierService.notify("error", " Fiabilité champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.noteAttrait == undefined) {
      this.notifierService.notify("error", " Attrait pour l'informatique champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.notePret == undefined) {
      this.notifierService.notify("error", " Prêt à la reconversion champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.noteMobilite == undefined) {
      this.notifierService.notify("error", " Mobilité champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.noteCoherence == undefined) {
      this.notifierService.notify("error", " Cohérence du parcours champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.notePistes == undefined) {
      this.notifierService.notify("error", " Potentiel d’évolution champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.anglais == undefined) {
      this.notifierService.notify("error", " Anglais champs obligatoire")
      error = true;
    }
    if (this.currentCandidat.suivi.mobilite == undefined) {
      this.notifierService.notify("error", " mobiliteSuivi : erreur de validation. Vous devez indiquer une valeur.")
      error = true;
    }

    if (!this.verfierSuiviRelance() && !this.verfierStatus() && !this.verfierSuivinoteResultat()) {



      this.helperService.generateComp(this.currentCandidat, this.competences);

      //#region  Save Or Update Suivi
      this.currentCandidat.suivi.charge = this.userService.getConnetedUserInfo();
      if (!error) {

        await this.suiviService.createOrUpdate(this.currentCandidat.suivi).toPromise().then((data: Suivi) => {

          data.dateRelance = new Date(data.dateRelance)
          this.currentCandidat.suivi = data;
        });

        this.currentCandidat.entretien.charge = this.userService.getConnetedUserInfo();
        await this.entretienService.createOrUpdate(this.currentCandidat.entretien).toPromise().then((data: Entretien) => {
          if ((this.currentCandidat.entretien.id > 0) && (this.currentCandidat.entretien.disponible.id > -1))
            this.notifierService.notify("success", "Modifié!, Entretien modifié avec success !");
          data.date = new Date(data.date)
          this.currentCandidat.entretien = data;
        })

        this.currentCandidat.motif = null;
        if ((this.currentCandidat.entretien.disponible.libelle == "Disponible") && (this.currentCandidat.statut.libelle != "Valide") && (this.currentCandidat.suivi.noteFiabilite != undefined)) {
          this.currentCandidat.statut.libelle = "En attente d’affectation"
          this.currentCandidat.statut.id = 4
        }
        await this.candidatsService.updateficheEntretien(this.currentCandidat).toPromise().then(data => {
        })
        //#endregion
        this.router.navigate([NAVIGATION_RULES.entretien.url + '/' + NAVIGATION_RULES.entretien.list]);
      }
    }
  }

  dateNaissanceChangedHandler() {
    this.currentCandidat.age = this.helperService.getAge(this.currentCandidat.dateNaissance)
  }
}
