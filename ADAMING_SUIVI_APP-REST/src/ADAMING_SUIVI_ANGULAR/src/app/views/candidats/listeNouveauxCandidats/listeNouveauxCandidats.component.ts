import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidateDto } from "../CandidateDto";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { Router } from "@angular/router";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeNouveauxCandidats.component.html',
  styleUrls: ["listeNouveauxCandidats.component.css"]

})
export class listeNouveauxCandidatsComponent implements OnInit {


  
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
      data:'technologie',
      title:'Type de profil',
      visible:true
    },
    {
      data:'region',
      title:'Région',
      visible:true
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
    }
  ]


  public loading = false;
  mask: any[] = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  technologies = []
  origines = []
  competences = []
  candidats: any[];

  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;

  condidat: CandidateDto = new CandidateDto();
  CritereRecheche: [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];

  constructor(private router:Router, private technologiesService: TechnologieService,
    private candidatsService: CandidatsService, private helperService: HelperService,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.rechercheCandidat();
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

  doRechercheCandidat(callBack?) {
    let page = (this.currentPage - 1) * this.size;
    this.candidatsService.rechercheNouveauxcandidats(this.condidat, page, this.size).subscribe(data => {
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
    this.condidat.dateInscription = null;
    this.condidat.technologie = null;
    this.condidat.nomSourceur = null;
    this.condidat.prenomSourceur = null;
    this.condidat.region = null;
    this.condidat.dateInscription = null;
    this.condidat.critereRecheche = null;
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
}
