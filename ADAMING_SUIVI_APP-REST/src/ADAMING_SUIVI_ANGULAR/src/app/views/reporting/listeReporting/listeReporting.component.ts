import { StatutService } from './../../../services/administrationService/StatutService';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { RegionService } from "../../../services/administrationService/region.service";
import { Region } from "../../../models/region";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { CandidateDto } from "../../candidats/CandidateDto";
import { Router } from "@angular/router";
import { NAVIGATION_RULES, PHONE_MASK, PHONE_MASK_LABEL, DATE_FORMAT, DATE_FORMAT_MOMENT } from "../../../helper/application.constant";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { UtilisateurService } from "../../../services/utilisateur.service";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as _moment from 'moment';
import { RoutingState } from '../../../helper/routing-state.service';
import { Utilisateur } from '../../../models/Utilisateur';

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeReporting.component.html',
  styleUrls: ["listeReporting.component.css"]

})
export class ListeReportingComponent implements OnInit {

  titleTable = "Liste Reporting"

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


  region: Array<Region> = [];
  lieux = []
  mask: any[] = PHONE_MASK;
  technologies = []
  statuts = []
  origines = []
  condidat2: CandidateDto = new CandidateDto();
  verif: number;
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche: [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  refStatut = this.helperService.buildStatutArray();

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
      data: 'diplome',
      title: 'Diplôme',
      visible: false
    },
    {
      data: 'dateObtentionDiplome',
      title: 'Obtention De Diplôme',
      visible: false,
      dateFormat: DATE_FORMAT

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
      data: 'origine',
      title: 'Origine',
      visible: false
    },
    {
      data: 'dateInscription',
      title: 'Date inscription',
      visible: true,
      dateFormat: DATE_FORMAT
    },
    {
      data: 'statut',
      title: 'Statut',
      visible: false
    },

    {
      data: 'dateEntretien',
      title: 'Date entretien',
      visible: false,
      dateFormat: DATE_FORMAT

    },
    {
      data: 'charge',
      title: 'charge',
      visible: true
    },
    {
      data: 'pertinence',
      title: 'Pertinence',
      visible: false
    },
    {
      data: 'disponibilite',
      title: 'Disponibilité',
      visible: false
    },
    {
      data: 'lieuEntretien',
      title: 'Lieu entretien',
      visible: false
    }, {
      data: 'noteTotale',
      title: 'Note Totale',
      visible: true
    },
    {
      title: 'Appréciation',
      visible: true,
      html: true,
      rendered: function (candidat): string {
        if (candidat.noteTotale != null && candidat.noteTotale != undefined) {
          if (candidat.noteTotale * 2 > 6) return '<img class="imgAppreciation" src="assets/img/appreciation/appreciation_valider.png">';
          else if (candidat.noteTotale * 2 > 5) {
            return '<img  class="imgAppreciation" src="assets/img/appreciation/appreciation_attente.png">';
          }
          else { return '<img  class="imgAppreciation" src="assets/img/appreciation/appreciation_refuser.png">' }
        }
        else return "";
      }
    },
    {
      data: 'formation',
      title: 'Formation',
      visible: false
    },
    {
      data: 'dateDemarrageFormation',
      title: 'Date démarrage formation',
      visible: false,
      dateFormat: DATE_FORMAT

    },
    {
      data: 'source',
      title: 'sourceur',
      visible: true
    },
    {
      data: 'technologie',
      title: 'Type de profil',
      visible: false
    }
  ];
  listSourceur = [];
  listCarge = [];
  verif_existance_code_region: boolean;
  tester_perfermance: boolean;
  valeur_des_region_en_retour: Array<string> = [];
  constructor(private originesService: OriginesService, private technologiesService: TechnologieService,
    private routingState: RoutingState, private sanitizer: DomSanitizer, private candidatsService: CandidatsService,
    private notifierService: NotifierService, private competencesService: CompetencesService,
    public helperService: HelperService, private regionService: RegionService, private statutservice: StatutService,
    private lieuxService: LieuxService, private router: Router, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.notifierService.getConfig().behaviour.autoHide=800;

    if (this.routingState.getPreviousUrl().indexOf('details') > -1)
      this.condidat = this.helperService.listeReportingCandidatrecherche;

    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.statutservice.findAllStatut().subscribe(data => {
      this.statuts = data;
    }
    )
    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
    this.utilisateurService.getAllSourceurs().subscribe(data => {
      this.listSourceur = data
    })
    this.utilisateurService.getAllChages().subscribe(data => {
      this.listCarge = data
    })
  }

  ngOnDestroy(): void {
    this.helperService.listeReportingCandidatrecherche = this.condidat;
  }
  initTableFunction() {
    this.rechercheCandidat()
  }
  rechercheCandidat() {
    if (this.condidat.sourceur == null) {

      this.condidat.sourceur = new Utilisateur();
    }
    if (this.condidat.chargeur == null) {
      this.condidat.chargeur = new Utilisateur();

    }

    this.condidat.nomSourceur = this.condidat.sourceur.nom;
    this.condidat.prenomSourceur = this.condidat.sourceur.prenom;
    this.condidat.nomCharge = this.condidat.chargeur.nom;
    this.condidat.prenomCharge = this.condidat.chargeur.prenom;
    if (this.condidat.nomCharge == null)
      this.condidat.chargeur = null
    if (this.condidat.nomSourceur == null)
      this.condidat.sourceur = null

    let callBack = (e) => {
      this.notifierService.notify("info", "Nombre Candidat : " + this.table.maxlenght)
    }
    this.table.setPage(1, callBack);
  }


  recherche(item, page, size, allValue) {
    return this.candidatsService.rechercheReporting(item, page, size)
  }

  rechercheNbr(item, allValue) {
    return this.candidatsService.rechercheReportingNbr(item)
  }

  reset() {
    this.verif = 1;
    this.condidat = new CandidateDto();
    this.condidat2 = new CandidateDto();
    this.table.item2 = this.condidat2;
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

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.reporting.url + '/' + NAVIGATION_RULES.reporting.details.replace(':id', candidat.id)]);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    var cell = worksheet["A1"]
    cell.s = { alignment: { textRotation: 90 }, font: { sz: 14, bold: true, color: "#FF00FF" } };
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, this.titleTable);
  }
  exportAsXLSX(): void {

    this.candidatsService.rechercheReporting(this.table.item, 0, this.table.maxlenght).subscribe(data => {
      var cleanData = [];
      data.forEach(element => {
        var cleanItem = {}
        this.columns.forEach(col => {
          if (element[col.data] == null) {
            cleanItem[col.title] = ' - ';
          }
          if (element[col.data] != null) {
            if (col.dateFormat != undefined)
              cleanItem[col.title] = _moment(element[col.data]).format(DATE_FORMAT_MOMENT);
            else if (col.mask != undefined && element[col.data].indexOf("-") == -1) {
              cleanItem[col.title] = element[col.data].replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}).*/, "$1-$2-$3-$4-$5");
            }
            else cleanItem[col.title] = element[col.data];
          }
        })
        cleanData.push(cleanItem);
      });
      this.exportAsExcelFile(cleanData, 'sample');

    })

  }
}
