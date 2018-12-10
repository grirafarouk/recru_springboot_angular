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
import { NAVIGATION_RULES, PHONE_MASK, PHONE_MASK_LABEL, DATE_FORMAT } from "../../../helper/application.constant";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeReporting.component.html',
  styleUrls: ["listeReporting.component.css"]

})
export class ListeReportingComponent implements OnInit {

  titleTable="List Reporting"

  @ViewChild("table")
  table;

  actions = {
    visible:true,
    title:'Actions',
    items:[
    {
      icon: 'fa fa-edit',
      class: 'btn-outline-success btn btn-sm',
      tooltip:'Détails',
      action: (e) => {
        this.openDetails(e);    
      }
    },
    {
      icon: 'fa fa-download',
      class: 'btn-outline-warning btn btn-sm',
      tooltip:'Telecharger CV',
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
  origines = []
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
      visible: false
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
      visible: false
    },
    {
      data: 'nomCharge',
      title: 'Nom charge',
      visible: true
    },
    {
      data: 'prenomCharge',
      title: 'Prénom charge',
      visible: false
    },
    {
      data: 'pertinence',
      title: 'Pertinence',
      visible: false
    },
    {
      data: 'disponible',
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
      visible: false
    },
    {
      data: 'technologie',
      title: 'Type de profil',
      visible: false
    }
  ];


  constructor(private originesService: OriginesService, private technologiesService: TechnologieService,
    private sanitizer: DomSanitizer, private candidatsService: CandidatsService,
    private notifierService: NotifierService, private competencesService: CompetencesService,
    private helperService: HelperService, private regionService: RegionService,
    private lieuxService: LieuxService, private router: Router) { }

  ngOnInit(): void {
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.lieuxService.findAllLieux().subscribe(data => {
      this.lieux = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
    })
  }


  initTableFunction(){
    this.rechercheCandidat()
  }
  rechercheCandidat() {
    let callBack = (e) => {
      this.notifierService.notify("info", "Nombre Candidat : " + this.table.maxlenght)
    }
    this.table.setPage(1, callBack);
  }


  recherche(item, page, size,allValue) {
    return this.candidatsService.rechercheReporting(item, page, size)
  }

  rechercheNbr(item,allValue) {
    return this.candidatsService.rechercheReportingNbr(item)
  }

  reset() {
    this.condidat = new CandidateDto()
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

  codePostaleOnSearch(value) {
    if (value != "")
      this.regionService.completeRegion(value).subscribe(data => {
        data.forEach(element => {
          this.region = [...  this.region, element]
        });
      })
    else this.region = []
  }

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.reporting.url + '/' + NAVIGATION_RULES.reporting.details.replace(':id', candidat.id)]);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  exportAsXLSX():void {
    this.exportAsExcelFile(this.table.items, 'sample');
  }
}
