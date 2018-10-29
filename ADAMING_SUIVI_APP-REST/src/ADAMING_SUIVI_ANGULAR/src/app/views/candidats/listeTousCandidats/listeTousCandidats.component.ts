import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeTousCandidats.component.html',
  
})
export class listeTousCandidatsComponent implements OnInit {

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
      visible:true
    },
    {
      data:'statut',
      title:'Statut',
      visible:false
    },
    {
      data:'dateRelance',
      title:'Date relance',
      visible:true
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
      visible:false
    },
    {
      data:'prenomSourceur',
      title:'Prénom sourceur',
      visible:false
    },
    {
      data:'dateEntretien',
      title:'Date entretien',
      visible:true
    },
    {
      data:'lieuEntretien',
      title:'Lieu entretienr',
      visible:true
    },
    {
      data:'disponibilite',
      title:'Disponible',
      visible:true
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

  public loading = false;
  technologies=[]
  lieux=[]
  origines=[]
  competences=[]
  candidats: any[];

  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  region: Array<Region> = [];
  refStatut = this.helperService.buildStatutArray();
  refDisponibilite = this.helperService.buildDisponibiliteArray();
  condidat: CandidateDto = new CandidateDto();

  constructor(private router:Router,private candidatsService:CandidatsService,
    private notifierService:NotifierService, private technologiesService: TechnologieService,
    private lieuxService:LieuxService,private helperService:HelperService, private regionService: RegionService) {}

  ngOnInit(): void {
    this.rechercheCandidat()
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    })
  } 

  rechercheCandidat() {
    this.loading=true;
    this.currentPage = 1;
    let callBack = (e)=>{
      this.notifierService.notify("info", "Nombre Candidat : " +  this.maxlenght)
    }
    this.doRechercheCandidat(callBack);
   }

   doRechercheCandidat(callBack?){
    let page = (this.currentPage - 1) * this.size;
    this.candidatsService.rechercheTouscandidats(this.condidat, page, this.size).subscribe(data => {
      this.maxlenght = data.total;
      this.candidats = data.results;
      this.lastPage = Math.ceil(this.maxlenght / this.size)
      this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
      this.loading=false;
      if(callBack) callBack();
    },error=>{
      this.loading=false
    })
   }

   reset() {
    this.condidat.nom = null;
    this.condidat.prenom = null;
    this.condidat.numeroTel = null;
    this.condidat.email = null;
    this.condidat.dateEntretien = null;
    this.condidat.technologie = null;
    this.condidat.nomSourceur = null;
    this.condidat.prenomSourceur = null;
    this.condidat.region = null;
    this.condidat.dateRelance=null;
    this.condidat.statut=null;
    this.rechercheCandidat();
  }

  
  setPage(p) {
    this.loading=true;
    this.currentPage = p;
    this.pages = this.helperService.generatePages(this.currentPage, this.lastPage)
    this.doRechercheCandidat();
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
    this.router.navigate(["/candidats/details/"+candidat.id]);
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
}
