import { disponibiliteService } from './../../../services/administrationService/disponibiliteService';
import { StatutService } from './../../../services/administrationService/StatutService';
import { Component, OnInit, OnDestroy, ViewChild, forwardRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidateDto } from "../CandidateDto";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { HelperService } from "../../../helper/helper.service";
import { Router } from "@angular/router";
import { CodePostalService } from "../../../services/administrationService/code-postal.service";
import { CodePostal } from "../../../models/CodePostal";
import { RegionService } from "../../../services/administrationService/region.service";
import { Region } from "../../../models/region";
import { NAVIGATION_RULES, PHONE_MASK_LABEL, DATE_FORMAT, PHONE_MASK, DATE_FORMAT_MOMENT } from "../../../helper/application.constant";
import { Status } from "../../../models/enum/Status";
//import { Disponibilite } from "../../../models/enum/Disponibilite";
import { RoutingState } from "../../../helper/routing-state.service";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { UtilisateurService } from "../../../services/utilisateur.service";
import { ExcelService } from "../../../services/excel.service";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as _moment from 'moment';


@Component({
  selector: 'list',
  templateUrl: 'listeTousCandidats.component.html',
  styleUrls: ["listeTousCandidats.component.css"]
})
export class listeTousCandidatsComponent implements OnInit, OnDestroy {
  regex = new RegExp('^([a-zA-Z]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+$');
  titleTable = "Liste de tous les candidats "

  @ViewChild("table")
  table;

  actions = {
    visible: true,
    title: 'Actions',
    items: [
      {
        icon: 'fa fa-edit',
        class: 'btn-outline-success btn btn-sm',
        tooltip: 'Détails',
        action: (e) => {
          this.openDetails(e);
        }
      },
      {
        icon: 'fa fa-download',
        class: 'btn-outline-warning btn btn-sm',
        tooltip: 'Telecharger CV',
        action:
          (e) => {
            this.downloadCV(e);
          }
      }
    ]
  }

  columns = [
    {
      data: 'nom',
      title: 'Nom',
      visible: true
    },
    {
      data: 'prenom',
      title: 'Prenom',
      visible: true
    },
    {
      data: 'numeroTel',
      title: 'N° Téléphone',
      visible: true,
      mask: PHONE_MASK_LABEL
    },
    {
      data: 'email',
      title: 'Email',
      visible: true
    },
    {
      data: 'dateInscription',
      title: 'Date inscription',
      visible: true,
      dateFormat: DATE_FORMAT
    },
    {
      data: 'statut',
      title: 'Délai Traitement	',
      visible: true,
      html: false,
      rendered: (e) => {
        return e.dateEntretien != null && e.dateInscription != null
          ? Math.ceil((new Date(_moment(e.dateEntretien).format("MM/DD/YYYY")).getTime() - new Date(_moment(e.dateInscription).format("MM/DD/YYYY")).getTime()) / (1000 * 3600 * 24)) + " (J)" : " - "
      }
    },
    {
      data: 'statut',
      title: 'Statut',
      visible: false,
    },
    {
      data: 'dateRelance',
      title: 'Date relance',
      visible: true,
      dateFormat: DATE_FORMAT
    },
    {
      data: 'technologie',
      title: 'Type de profil',
      visible: false
    },
    {
      data: 'region',
      title: 'Région',
      visible: false
    },
    {
      data: 'nomSourceur',
      title: 'Nom sourceur',
      visible: false
    },
    {
      data: 'prenomSourceur',
      title: 'Prénom sourceur',
      visible: false
    },
    {
      data: 'dateEntretien',
      title: 'Date entretien',
      visible: true,
      dateFormat: DATE_FORMAT
    },
    {
      data: 'lieuEntretien',
      title: 'Lieu entretien',
      visible: true
    },
    {
      data: 'disponibilite',
      title: 'Disponible',
      visible: true,

    },
    {
      data: 'nomCharge',
      title: 'Nom charge',
      visible: true
    },
    {
      data: 'prenomCharge',
      title: 'Prénom charge',
      visible: true
    }
  ]

  public loading = false;
  technologies = []
  lieux = []
  statuts = []

  mask: any[] = PHONE_MASK;

  region: Array<Region> = [];
  refStatut = this.helperService.buildStatutArray();
  // refDisponibilite = this.helperService.buildDisponibiliteArray();
  condidat: CandidateDto = new CandidateDto();
  listSourceur: any[];
  listCarge: any[];
  disponibleListe: any[];
  verif_existance_code_region: boolean;
  tester_perfermance: boolean;
  valeur_des_region_en_retour: Array<string> = [];


  constructor(private router: Router, private candidatsService: CandidatsService, private routingState: RoutingState,
    private notifierService: NotifierService, private technologiesService: TechnologieService,
    private lieuxService: LieuxService, private disponibiliteService: disponibiliteService, private helperService: HelperService, private statutservice: StatutService, private regionService: RegionService,
    private utilisateurService: UtilisateurService,
    private excelService: ExcelService) {


  }

  ngOnInit(): void {
    if (this.routingState.getPreviousUrl().indexOf('details') > -1)
      this.condidat = this.helperService.listTousCandidatRecherche;

    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })
    this.disponibiliteService.findAllDisponibilite().subscribe(data => {

      this.disponibleListe = data;
    }
    )
    this.statutservice.findAllStatut().subscribe(data => {
      this.statuts = data;
    }
    )
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.utilisateurService.getAllSourceurs().subscribe(data => {
      this.listSourceur = data
    })
    this.utilisateurService.getAllChages().subscribe(data => {
      this.listCarge = data
    })
  }


  ngOnDestroy(): void {
    this.helperService.listTousCandidatRecherche = this.condidat;
  }
  rechercheCandidat() {
    if (!this.regex.test(this.condidat.nom) && !this.regex.test(this.condidat.prenom)) {
      this.notifierService.notify("error", "Les champs de saisi «Nom» est «Prenom» sont invalides")
    }
    else {
      if (!this.regex.test(this.condidat.nom)) {
        this.notifierService.notify("error", "Le champ de saisi « Nom » est invalide")
      }
      else if (!this.regex.test(this.condidat.prenom)) {
        this.notifierService.notify("error", "Le champ de saisi « Prenom » est invalide")
      }
      else {
        let callBack = (e) => {
          this.notifierService.notify("info", "Nombre Candidat : " + this.table.maxlenght)
        }
        this.table.setPage(1, callBack);
      }
    }
  }
  initTableFunction() {
    this.rechercheCandidat()
  }

  recherche(item, page, size, allValue) {
    return this.candidatsService.rechercheTouscandidats(item, page, size)
  }

  rechercheNbr(item, allValue) {
    return this.candidatsService.rechercheTouscandidatsNbr(item)
  }

  reset() {
    this.condidat = new CandidateDto();
    this.table.item = this.condidat;
    this.rechercheCandidat();
  }


  downloadCV(candidat) {
    this.candidatsService.getCvCandidats(candidat).subscribe(res => {
      let file = res;
      var url = window.URL.createObjectURL(file.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = file.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element     

    })
  }

  public codePostaleOnSearch(value: string) {
    this.verif_existance_code_region = true;
    this.tester_perfermance = true;
    if ((value != "")) {
      this.valeur_des_region_en_retour.forEach((data, i) => {
        if (data.includes(value)) {
          this.tester_perfermance = false;
          this.valeur_des_region_en_retour.splice(i)
        }
      })

      if (this.tester_perfermance == true) {
        this.valeur_des_region_en_retour.push(value);
        this.regionService.completeRegion(value).subscribe((data) => {
          data.forEach(element => {
            this.region.forEach(reg => {
              if (element.code === reg.code) {
                this.verif_existance_code_region = false;
              }
            })

            if (this.verif_existance_code_region == true)
              this.region = [... this.region, element]

          });
        })
      }
    }
    else this.region = []
  }

  private updateDateRelance(date: Date) {
    this.condidat.dateRelance = date
  }

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.details.replace(':id', candidat.id)]);
  }

  public exportAsXLSX(): void {
    this.candidatsService.rechercheTouscandidats(this.table.item, 0, this.table.maxlenght).subscribe(data => {
      this.excelService.exportAsExcelFile(data, this.titleTable, this.columns);
    })
  }

}
