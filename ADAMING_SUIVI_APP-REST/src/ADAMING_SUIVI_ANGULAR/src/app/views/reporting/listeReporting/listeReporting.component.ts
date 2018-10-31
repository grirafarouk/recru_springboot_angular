import { Component, OnInit } from "@angular/core";
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


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeReporting.component.html',
  styleUrls: ["listeReporting.component.css"]

})
export class ListeReportingComponent implements OnInit {
  
  mask: any[] = [/\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/];
  technologies=[]
  origines=[]
  competences=[]
  candidats: any[];
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche : [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  refStatut = this.helperService.buildStatutArray();

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
      data:'diplome',
      title:'Diplôme',
      visible:false
    },
    {
      data:'dateObtentionDiplome',
      title:'Obtention De Diplôme',
      visible:false
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
      data:'origine',
      title:'Origine',
      visible:false
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
      data:'pertinence',
      title:'Pertinence',
      visible:false
    },
    {
      data:'disponible',
      title:'Disponibilité',
      visible:false
    },
    {
      data:'lieuEntretien',
      title:'Lieu entretien',
      visible:true
    },
    {
      data:'formation',
      title:'Formation',
      visible:false
    },
    {
      data:'dateDemarrageFormation',
      title:'Date démarrage formation',
      visible:false
    },
    {
      data:'technologie',
      title:'Type de profil',
      visible:false
    }
  ];
  public loading = false;
  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  region: Array<Region> = [];
  lieux=[]

  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,
    private notifierService:NotifierService,private competencesService:CompetencesService,
    private helperService:HelperService, private regionService: RegionService,
    private lieuxService:LieuxService) {}

  ngOnInit(): void {
    this.rechercheCandidat();
    this.technologiesService.findAllTechnologies().subscribe(data=>{
      this.technologies = data;
    })
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
    this.originesService.findAllOrigines().subscribe(data => {
      this.origines = data;
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
    this.candidatsService.RechercheReporting(this.condidat, page, this.size).subscribe(data => {
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
     this.condidat.email = null;
     this.condidat.dateInscription= null;
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

  codePostaleOnSearch(value) {
    if (value != "")
      this.regionService.completeRegion(value).subscribe(data => {
        data.forEach(element => {
          this.region = [...  this.region, element]
        });
      })
    else this.region = []
  }

  
}