import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CandidateDto } from "../CandidateDto";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { Router } from "@angular/router";
import { NAVIGATION_RULES, PHONE_MASK_LABEL, DATE_FORMAT, PHONE_MASK, DATE_FORMAT_MOMENT } from "../../../helper/application.constant";
import { RoutingState } from "../../../helper/routing-state.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { RegionService } from "../../../services/administrationService/region.service";
import * as _moment from 'moment';
import { Region } from "../../../models/region";
import { ExcelService } from "../../../services/excel.service";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeNouveauxCandidats.component.html',
  styleUrls: ["listeNouveauxCandidats.component.css"]

})
export class listeNouveauxCandidatsComponent implements OnInit, OnDestroy {
  regex = new RegExp('^([a-zA-Z]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+$');
  titleTable = "Liste Nouveaux Candidats "

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
      visible: true,
    },
    {
      data: 'prenom',
      title: 'Prenom',
      visible: true,
      align: 'center'
    },
    {
      data: 'numeroTel',
      title: 'N° Téléphone',
      visible: true,
      mask: PHONE_MASK_LABEL,
      align: 'center'
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
      data: 'technologie',
      title: 'Type de profil',
      visible: true
    },
    {
      data: 'region',
      title: 'Région',
      visible: true
    },
    {
      data: 'nomSourceur',
      title: 'Nom sourceur',
      visible: true
    },
    {
      data: 'prenomSourceur',
      title: 'Prénom sourceur',
      visible: true
    }
  ]
  mask: any[] = PHONE_MASK;
  technologies = []
  candidats: any[];
  listSourceur: any[];
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche: [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  region: Array<Region> = [];


  constructor(private router: Router,
    private technologiesService: TechnologieService,
    private candidatsService: CandidatsService,
    private helperService: HelperService,
    private routingState: RoutingState,
    private notifierService: NotifierService,
    private utilisateurService: UtilisateurService,
    private regionService: RegionService,
    private excelService:ExcelService) {

  }

  ngOnInit(): void {
    if (this.routingState.getPreviousUrl().indexOf('details') > -1)
      this.condidat = this.helperService.listNouveauxCandidatRecherche;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    }),
      this.utilisateurService.getAllSourceurs().subscribe(data => {
        this.listSourceur = data
      })
  }
  ngOnDestroy(): void {
    this.helperService.listNouveauxCandidatRecherche = this.condidat;
  }
  rechercheCandidat() {
    if(!this.regex.test(this.condidat.nom) && !this.regex.test(this.condidat.prenom))
    {
      this.notifierService.notify("error","Les champs de saisi «Nom» est «Prenom» sont invalides") 
    }
    else
    {
    if(!this.regex.test(this.condidat.nom))
    {
    this.notifierService.notify("error","Le champ de saisi « Nom » est invalide")
    }
    else if( !this.regex.test(this.condidat.prenom))
    {
      this.notifierService.notify("error","Le champ de saisi « Prenom » est invalide") 
    }
    else
    {
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
    return this.candidatsService.rechercheNouveauxcandidats(item, page, size)
  }

  rechercheNbr(item, allValue) {
    return this.candidatsService.rechercheNouveauxcandidatsNbr(item)
  }

  reset() {
    this.condidat = new CandidateDto();
    this.table.item= this.condidat;
    this.rechercheCandidat();
  }




  public downloadCV(candidat) {
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

  public openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.details.replace(':id', candidat.id)]);
  }


  public exportAsXLSX(): void {
    this.candidatsService.rechercheNouveauxcandidats(this.table.item, 0, this.table.maxlenght).subscribe(data => {
      this.excelService.exportAsExcelFile(data,this.titleTable,this.columns);
    })
  }

  public codePostaleOnSearch(value) {
    if (value != "")
      this.regionService.completeRegion(value).subscribe(data => {
        data.forEach(element => {
          this.region = [...  this.region, element]
        });
      })
    else this.region = []
  }
}
