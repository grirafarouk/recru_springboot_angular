import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidateDto } from "../CandidateDto";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { Router } from "@angular/router";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeEntretien.component.html',
  
})
export class listeEntretienComponent implements OnInit {
  
  mask: any[] = [/\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/];
  technologies=[]
  origines=[]
  competences=[]
  candidats: any[];
  page= 0;
  size= 10;
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche : [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
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
      data:'email',
      title:'Email',
      visible:true
    },
    {
      data:'dateInscription',
      title:'Date inscription',
      visible:false
    },
    {
      data:'numeroTel',
      title:'N° Téléphone',
      visible:true
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
      data:'nomCharge',
      title:'Nom charge',
      visible:true
    },
    {
      data:'prenomCharge',
      title:'Prénom charge',
      visible:true
    },
    {
      data:'mobilite',
      title:'Mobilité',
      visible:false
    },
    {
      data:'statut',
      title:'Statut',
      visible:true
    }
  ];
  public loading = false;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  pages = [];
  lieux=[]


  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,  private router:Router,
    private notifierService:NotifierService,private competencesService:CompetencesService,private helperService:HelperService,
    private lieuxService:LieuxService) {}

  ngOnInit(): void {
    this.rechercheCandidat();
    this.technologiesService.findAllTechnologies().subscribe(data=>{
    this.technologies = data;
    })
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
  }

  /*getListeCandidat(){
    this.candidatsService.getCandidatEntretien(this.page,this.size).subscribe(data => this.candidats = data);
  }
  rechercheCandidat() {
      this.candidatsService.rechercheNouveauxcandidats(this.condidat,0,this.size).subscribe(data=>{this.candidats = data
        this.notifierService.notify("info","Nombre Candidat : "+data.length)
      })
   }*/

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
    this.candidatsService.rechercheCandidatAvecEntretien(this.condidat, page, this.size).subscribe(data => {
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

   reset(){
     this.condidat.nom=null;
     this.condidat.prenom = null;
     this.condidat.numeroTel = null;
     this.condidat.dateEntretien = null;
     this.condidat.lieuEntretien = null;
     this.condidat.nomCharge = null;
     this.condidat.prenomCharge = null;
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
    this.router.navigate(["/listeEntretien/details/"+candidat.id]);
  }
}
