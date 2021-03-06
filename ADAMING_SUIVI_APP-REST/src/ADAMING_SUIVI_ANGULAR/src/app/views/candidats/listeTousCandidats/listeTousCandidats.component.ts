import { Validators } from '@angular/forms';
import { map, isEmpty } from 'rxjs/operators';
import { Profil } from './../../../models/enum/Profil';
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
import { Utilisateur } from '../../../models/Utilisateur';


@Component({
  selector: 'list',
  templateUrl: 'listeTousCandidats.component.html',
  styleUrls: ["listeTousCandidats.component.css"]
})
export class listeTousCandidatsComponent implements OnInit, OnDestroy {
  regex = new RegExp('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$');
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
      data: 'source',
      title: 'sourceur',
      visible: true
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
      data: 'charge',
      title: 'charge',
      visible: true,

    },
  ]

  public loading = false;
  technologies = []
  lieux = []
  statuts = []
  verif: number;
  condidat2: CandidateDto = new CandidateDto();
  mask: any[] = PHONE_MASK;
  liste_tous_canndidat: Array<CandidateDto> = []
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
    private lieuxService: LieuxService, private disponibiliteService: disponibiliteService, public helperService: HelperService, private statutservice: StatutService, private regionService: RegionService,
    private utilisateurService: UtilisateurService,
    private excelService: ExcelService) {


  }

  ngOnInit(): void {
    this.notifierService.getConfig().behaviour.autoHide=800;

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
    console.log(this.condidat)

  }


  ngOnDestroy(): void {
    this.helperService.listTousCandidatRecherche = this.condidat;
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
    this.verif = 1;
    this.condidat2 = new CandidateDto();
    this.table.item2 = this.condidat2;
    this.condidat = new CandidateDto();
    this.table.item = this.condidat;
    console.log(this.condidat)
    console.log(this.condidat.dateRelance)
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

  updateDateRelance(date: Date) {
    this.condidat.dateRelance = date
  }

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.details.replace(':id', candidat.id)]);
  }

  public exportAsXLSX(): void {
    console.log(this.condidat)
    if( (this.condidat) ){
        console.log(' ok')

    } else {
      console.log('not')
    }
  
    this.candidatsService.rechercheTouscandidats(this.table.item, 0, this.table.maxlenght).subscribe(data => {
      this.excelService.exportAsExcelFile(data, this.titleTable, this.columns);
    })
  }

}
