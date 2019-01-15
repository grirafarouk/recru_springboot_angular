import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidateDto } from "../CandidateDto";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { Router } from "@angular/router";
import { RegionService } from "../../../services/administrationService/region.service";
import { Region } from "../../../models/region";
import { NAVIGATION_RULES, DATE_FORMAT, PHONE_MASK } from "../../../helper/application.constant";
import { RoutingState } from "../../../helper/routing-state.service";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeCandidatArelancer.component.html',
  styleUrls: ["listeCandidatArelancer.component.css"]
})
export class listeCandidatArelancerComponent implements OnInit, OnDestroy {
  regex = new RegExp('^([a-zA-Z]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+$');
  titleTable = "List Condidats A relancer "

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

  technologies = []
  refDisponibilite = this.helperService.buildDisponibiliteArray();
  region: Array<Region> = [];
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
      visible: true
    },
    {
      data: 'email',
      title: 'Email',
      visible: true
    },
    {
      data: 'dateInscription',
      title: 'Date inscription',
      visible: false,
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
      visible: true
    },
    {
      data: 'prenomSourceur',
      title: 'Prénom sourceur',
      visible: true
    },
    {
      data: 'disponibilite',
      title: 'Disponible',
      visible: true
    },
    {
      data: 'dateRelance',
      title: 'Date relance',
      visible: true,
      dateFormat: DATE_FORMAT

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

  condidat: CandidateDto = new CandidateDto();
  listSourceur: any[];
  listCarge: any[];
  relance: boolean;
  mask: any[] = PHONE_MASK;

  constructor(
    private router: Router,
    private candidatsService: CandidatsService,
    private helperService: HelperService,
    private notifierService: NotifierService,
    private technologiesService: TechnologieService,
    private routingState: RoutingState,
    private regionService: RegionService,private utilisateurService: UtilisateurService) {

  }

  ngOnInit(): void {
    if (this.routingState.getPreviousUrl().indexOf('details') > -1)
      this.condidat = this.helperService.listRelanceCandidatRecherche;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.utilisateurService.getAllSourceurs().subscribe(data=>{
      this.listSourceur=data
    })
    this.utilisateurService.getAllChages().subscribe(data=>{
      this.listCarge=data
    })
  }
  ngOnDestroy(): void {
    this.helperService.listRelanceCandidatRecherche = this.condidat;
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
  recherche(item, page, size,allValue) {
    return this.candidatsService.rechercheCandidatArelancer(item, page, size)
  }

  rechercheNbr(item,allValue) {
    return this.candidatsService.rechercheCandidatArelancerNbr(item)
  }
  
  reset() {
    this.condidat = new CandidateDto();
    this.table.item= this.condidat;
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

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.details.replace(':id', candidat.id)]);
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
  private updateDateRelance(date: Date) {
    this.condidat.dateRelance = date
  }

  relanceHandleChange(event) {
    if (this.relance == false) {
      this.condidat.dateDebut = undefined
      this.condidat.dateFin = undefined
    }
    else {
      this.condidat.dateRelance = undefined
    }
  }
}
