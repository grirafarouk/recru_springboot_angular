import { CandidatDetailResolve } from './../fiche-candidat/CandidatDetailResolve';
import { Observable } from 'rxjs';
import { Utilisateur } from './../../../models/Utilisateur';
import { disponibiliteService } from './../../../services/administrationService/disponibiliteService';
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
  regex = new RegExp('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$');
  titleTable = "Liste des candidats à relancer "

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
  //refDisponibilite = this.helperService.buildDisponibiliteArray();
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
      data: 'source',
      title: 'sourceur',
      visible: true
    },
    {
      data: 'disponibilite',
      title: 'Disponible',
      visible: true,
    },
    {
      data: 'dateRelance',
      title: 'Date relance',
      visible: true,
      dateFormat: DATE_FORMAT

    },
    {
      data: 'charge',
      title: 'charge',
      visible: true
    },
  ]
  searchdate() {
    if (this.condidat.dateInscription)
      console.log(this.condidat.dateInscription)


  }
  condidat: CandidateDto = new CandidateDto();
  listSourceur = [];
  verif: number;
  condidat2: CandidateDto = new CandidateDto()
  listCarge = [];
  sourceur: Array<Utilisateur> = [];
  relance: boolean = true;
  mask: any[] = PHONE_MASK;
  disponibleListe: any[];
  verif_existance_code_region: boolean;
  tester_perfermance: boolean;
  valeur_des_region_en_retour: Array<string> = [];
  constructor(
    private router: Router,
    private candidatsService: CandidatsService,
    public helperService: HelperService,
    private notifierService: NotifierService,
    private technologiesService: TechnologieService,
    private routingState: RoutingState,
    // tslint:disable-next-line:max-line-length
    private regionService: RegionService, private disponibilitesService: disponibiliteService, private utilisateurService: UtilisateurService) {

  }

  ngOnInit(): void {
    if (this.routingState.getPreviousUrl().indexOf('details') > -1)
      this.condidat = this.helperService.listRelanceCandidatRecherche;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
    this.utilisateurService.getAllSourceurs().subscribe(data => {
      this.listSourceur = data;
    })

    this.disponibilitesService.findAllDisponibilite().subscribe(data => {
      this.disponibleListe = data;
    })
    this.utilisateurService.getAllChages().subscribe(data => {
      this.listCarge = data
    })

  }
  ngOnDestroy(): void {
    this.helperService.listRelanceCandidatRecherche = this.condidat;
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
    return this.candidatsService.rechercheCandidatArelancer(item, page, size)
  }

  rechercheNbr(item, allValue) {
    return this.candidatsService.rechercheCandidatArelancerNbr(item)
  }

  reset() {
    this.verif = 1;
    this.condidat2 = new CandidateDto();
    this.condidat = new CandidateDto();
    this.table.item = this.condidat;
    this.table.item2 = this.condidat2;
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
