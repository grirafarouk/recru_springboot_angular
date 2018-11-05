import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { RoutingState } from '../../../helper/routing-state.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { HelperService } from '../../../helper/helper.service';
import { Profil } from '../../../models/enum/Profil';
import { EntretienService } from '../../../services/entretien-service';
import { Status } from '../../../models/enum/Status';
import { SessionFormation } from '../../../models/SessionFormation';
import { SessionsFormationsService } from '../../../services/sessionService/sessions-formations.service';
import { RegionService } from '../../../services/administrationService/region.service';
import { formatDate } from '@angular/common';
import { SuiviService } from '../../../services/suivi-service';
import { Suivi } from '../../../models/Suivi';
import { NAVIGATION_RULES } from '../../../helper/application.constant';
declare var jQuery: any;

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
  origines: Array<Origine> = []
  competences: Array<Competence> = []
  lieux: Array<Lieu> = []

  pertinenecesValeurs = [1, 2, 3, 4, 5]
  pdfSource;
  refStatus = this.helperService.buildStatutArray();
  refDisponibilite = this.helperService.buildDisponibiliteArray();
  file;
  currentCandidat: Candidate;


  constructor(private route: ActivatedRoute, private competencesService: CompetencesService,
    private suiviService:SuiviService,
    private codePostalService: CodePostalService, private originesService: OriginesService,
    private technologiesService: TechnologieService, private candidatsService: CandidatsService,
    private sanitizer: DomSanitizer, private router: Router, private lieuxService: LieuxService,
    private notifierService: NotifierService,
    private routingState: RoutingState, private entretienService: EntretienService, private regionService: RegionService,
    private userService: UtilisateurService, private helperService: HelperService, private sessionsFormationsService: SessionsFormationsService) { }

  ngOnInit() {
    let profil = Profil[this.userService.getConnetedUserInfo().profil];
    this.enableSave = profil == Profil.ADMINISTRATEUR || profil == Profil.CHARGE || profil == Profil.DIRECTION
    
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

  private ratingComponentClick(clickObj: any) {
    this.currentCandidat.suivi[clickObj.name] = clickObj.rating;
  }

  private verfierStatus() {
    let error = false;
    if (Status[this.currentCandidat.statut] == Status.VALIDE && (this.currentCandidat.sessionFormation == null || this.currentCandidat.sessionFormation == undefined)) {
      this.notifierService.notify("error", " Champ obligatoire,Affectation candidat pour une session de fromation !")
      error = true;
    }
    return error;
  }

  private verfierSuiviRelance() {
    let error = false;

    if (this.currentCandidat.suivi.relance == true && this.currentCandidat.suivi.dateRelance == undefined) {
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
    var selectedRegions = []
    if (this.currentCandidat.suivi.regions != undefined) this.currentCandidat.suivi.regions.forEach(element => {
      selectedRegions.push(element.id + "");
    });
    this.map.setSelectedRegions(selectedRegions);
    this.regionFranceModal.show();
  }

 async sauvgarderFicheEntrtien() {
   
    if (!this.verfierSuiviRelance() && !this.verfierStatus()) {
      this.helperService.generateComp(this.currentCandidat,this.competences);

      //#region  Save Or Update Suivi
      this.currentCandidat.suivi.charge = this.userService.getConnetedUserInfo();

      await this.suiviService.createOrUpdate(this.currentCandidat.suivi).toPromise().then((data: Suivi) => {
        // if (this.currentCandidat.suivi.id > 0)
        //   this.notifierService.notify("success", "Modifié!, Candidat modifié avec success !");
        // else
        //   this.notifierService.notify("success", "Ajout!, Candidat ajouté avec success !");
        data.dateRelance = new Date(data.dateRelance)
        this.currentCandidat.suivi = data;
      });
      //#endregion
       //#region Save Or Update Entretien
       this.currentCandidat.entretien.charge = this.userService.getConnetedUserInfo();
       await this.entretienService.createOrUpdate(this.currentCandidat.entretien).toPromise().then((data: Entretien) => {
         if (this.currentCandidat.entretien.id > 0)
           this.notifierService.notify("success", "Modifié!, Entretien modifié avec success !");
         data.date = new Date(data.date)
         this.currentCandidat.entretien = data;
       })
       //#endregion
      //#region  Update Candidat
      this.currentCandidat.motif = null;
       await this.candidatsService.updateCandidat(this.currentCandidat).toPromise().then(data => {
      })
      //#endregion
      this.router.navigate([NAVIGATION_RULES.entretien.url+'/'+NAVIGATION_RULES.entretien.list]);
    }
  }

  private dateNaissanceChangedHandler(){
    this.currentCandidat.age= this.helperService.getAge(this.currentCandidat.dateNaissance)
  }
}
