import { Utilisateur } from './../../../models/Utilisateur';
import { ResponseContentType } from '@angular/http';
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
  regex = new RegExp('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$');
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
      data: 'source',
      title: 'sourceur',
      visible: true
    },

  ]
  nomprenom: any;
  mask: any[] = PHONE_MASK;
  technologies = []
  candidats: any[];
  listSourceur: any = [];
  condidat2: CandidateDto = new CandidateDto();
  verif: number;
  valeur: string;
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche: [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  region: Array<Region> = [];
  verif_existance_code_region: boolean;
  tester_perfermance: boolean;
  valeur_des_region_en_retour: Array<string> = [];
  dateaujourduit:Date;

  constructor(private router: Router,
    private technologiesService: TechnologieService,
    private candidatsService: CandidatsService,
    public helperService: HelperService,
    private routingState: RoutingState,
    private notifierService: NotifierService,
    private utilisateurService: UtilisateurService,
    private regionService: RegionService,
    private excelService: ExcelService) {

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
      this.dateaujourduit=new Date();
  console.log(this.dateaujourduit)
  }
  ngOnDestroy(): void {
    this.helperService.listNouveauxCandidatRecherche = this.condidat;
  }
  rechercheCandidat() {
    console.log(this.condidat);
    console.log(this.condidat.nom)
    if (this.condidat.sourceur == null) {
      this.condidat.sourceur = new Utilisateur();
    }
    this.condidat.nomSourceur = this.condidat.sourceur.nom;
    this.condidat.prenomSourceur = this.condidat.sourceur.prenom;
    if (this.condidat.nomSourceur == null)
      this.condidat.sourceur = null
    
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
    return this.candidatsService.rechercheNouveauxcandidats(item, page, size)
  }

  rechercheNbr(item, allValue) {
    return this.candidatsService.rechercheNouveauxcandidatsNbr(item)
  }

  reset() {

    this.verif = 1;
    this.condidat2 = new CandidateDto();
    this.table.item2 = this.condidat2;
    this.condidat = new CandidateDto();
    this.table.item = this.condidat;
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
      this.excelService.exportAsExcelFile(data, this.titleTable, this.columns);
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

    else
      this.region = []
  }
}
