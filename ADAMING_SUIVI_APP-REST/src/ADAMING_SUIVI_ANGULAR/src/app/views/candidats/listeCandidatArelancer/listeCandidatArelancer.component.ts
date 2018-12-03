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
import { NAVIGATION_RULES,DATE_FORMAT } from "../../../helper/application.constant";
import { RoutingState } from "../../../helper/routing-state.service";

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeCandidatArelancer.component.html',
  styleUrls: ["listeCandidatArelancer.component.css"]
})
export class listeCandidatArelancerComponent implements OnInit, OnDestroy {

  titleTable="List Condidats A relancer "

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

  technologies=[]
  refDisponibilite = this.helperService.buildDisponibiliteArray();
  region: Array<Region> = [];
  columns =[
    {
      data:'nom',
      title:'Nom',
      visible:true
    },
    {
      data:'prenom',
      title:'Prenom',
      visible:true
    },
    {
      data:'numeroTel',
      title:'N° Téléphone',
      visible:true
    },
    {
      data:'email',
      title:'Email',
      visible:true
    },
    {
      data:'dateInscription',
      title:'Date inscription',
      visible:false,
      dateFormat: DATE_FORMAT

    },
    {
      data:'technologie',
      title:'Type de profil',
      visible:false
    },
    {
      data:'region',
      title:'Région',
      visible:false
    },
    {
      data:'nomSourceur',
      title:'Nom sourceur',
      visible:true
    },
    {
      data:'prenomSourceur',
      title:'Prénom sourceur',
      visible:true
    },
    {
      data:'disponibilite',
      title:'Disponible',
      visible:true
    },
    {
      data:'dateRelance',
      title:'Date relance',
      visible:true,
      dateFormat: DATE_FORMAT

    },
    {
      data:'nomCharge',
      title:'Nom charge',
      visible:true
    },
    {
      data:'prenomCharge',
      title:'Prénom charge',
      visible:true
    }
  ]

  condidat: CandidateDto = new CandidateDto();
  

  constructor(
    private router:Router,
    private candidatsService:CandidatsService,
    private helperService:HelperService,
    private notifierService:NotifierService,
    private technologiesService: TechnologieService,
    private routingState: RoutingState,
    private regionService: RegionService) {

    }

  ngOnInit(): void {
    if(this.routingState.getPreviousUrl().indexOf('details')>-1)  
      this.condidat = this.helperService.listRelanceCandidatRecherche;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
  }
  ngOnDestroy(): void {
    this.helperService.listRelanceCandidatRecherche = this.condidat;
  }
  rechercheCandidat() {
    let callBack = (e) => {
      this.notifierService.notify("info", "Nombre Candidat : " + this.table.maxlenght)
    }
    this.table.setPage(1, callBack);
  }
  initTableFunction(){
    this.rechercheCandidat()
  }
  recherche(item, page, size) {
    return this.candidatsService.rechercheCandidatArelancer(item, page, size)
  }

   reset() {
    this.condidat= new CandidateDto();
    this.rechercheCandidat();
  }

  downloadCV(candidat){
    this.candidatsService.getCvCandidats(candidat).subscribe(res => {
      let file = res;
        var url = window.URL.createObjectURL(file.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download =file.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element     
       
    })
  }

  openDetails(candidat){
    this.router.navigate([NAVIGATION_RULES.candidats.url+'/'+NAVIGATION_RULES.candidats.details.replace(':id',candidat.id)]);
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
    console.log("date relance"+ date)
    this.condidat.dateRelance = date
  }

  relanceHandleChange(event) {
    if (this.condidat.relancer == false) {
      this.condidat.dateDebut = undefined
      this.condidat.dateFin = undefined
    }
    else
    {
      this.condidat.dateRelance = undefined
    }
  }
}
