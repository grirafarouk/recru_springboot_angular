import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidatsService } from "../../../services/candidats.service";
import { NotifierService } from "angular-notifier";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { CompetencesService } from "../../../services/administrationService/competences.service";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";
import { HelperService } from "../../../helper/helper.service";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { Router } from "@angular/router";
import { CandidateDto } from "../../candidats/CandidateDto";
import { NAVIGATION_RULES, DATE_FORMAT, PHONE_MASK_LABEL } from "../../../helper/application.constant";
import { Status } from "../../../models/enum/Status";
import { UtilisateurService } from "../../../services/utilisateur.service";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeEntretien.component.html',
  styleUrls: ["listeEntretien.component.css"]
})
export class listeEntretienComponent implements OnInit {
  

  titleTable="List Entretien"

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

  mask: any[] = [/\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/,'-', /\d/, /\d/];
  technologies=[]
  origines=[]

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
      visible:false,
      dateFormat : DATE_FORMAT
    },
    {
      data:'numeroTel',
      title:'N° Téléphone',
      visible:true,
      mask:PHONE_MASK_LABEL
    },
    {
      data:'dateEntretien',
      title:'Date entretien',
      visible:true,
      dateFormat : DATE_FORMAT
    },
    {
      data:'lieuEntretien',
      title:'Lieu entretien',
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
      visible:true,
      html :false,
      rendered : (e)=>{
        return Status[e.statut]
      }
    },
    {
      title: 'Appréciation',
      visible: true,
      html: true,
      rendered: function (candidat): string {
        if (candidat.noteTotale != null && candidat.noteTotale != undefined) {
          if (candidat.noteTotale * 2 > 6) return '<img class="imgAppreciation" src="assets/img/appreciation/appreciation_valider.png">';
          else if (candidat.noteTotale * 2 > 5) {
            return '<img  class="imgAppreciation" src="assets/img/appreciation/appreciation_attente.png">';
          }
          else { return '<img  class="imgAppreciation" src="assets/img/appreciation/appreciation_refuser.png">' }
        }
        else return "";
      }
    },
    {
      data: 'noteTotale' ,
      title: 'Note Totale',
      visible: true
    }
  ];
  public loading = false;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  pages = [];
  lieux=[]
  listCarge: any[];


  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,  private router:Router,
    private notifierService:NotifierService,private competencesService:CompetencesService,private helperService:HelperService,
    private lieuxService:LieuxService,    private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.technologiesService.findAllTechnologies().subscribe(data=>{
    this.technologies = data;
    })
    this.lieuxService.findAllLieux().subscribe(data=>{
      this.lieux = data;
    })
    this.utilisateurService.getAllChages().subscribe(data=>{
      this.listCarge=data
    })
  }






  reset() {
    this.condidat = new CandidateDto();
    this.table.item= this.condidat;
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
  initTableFunction(){
    this.rechercheCandidat()
  }
  rechercheCandidat() {
    let callBack = (e) => {
      this.notifierService.notify("info", "Nombre Candidat : " + this.table.maxlenght)
    }
    this.table.setPage(1, callBack);
  }


  recherche(item, page, size,allValue) {
    return this.candidatsService.rechercheCandidatAvecEntretien(item, page, size,allValue)
  }

  rechercheNbr(item,allValue) {
    return this.candidatsService.rechercheCandidatAvecEntretienNbr(item,allValue)
  }

  openDetails(candidat){
    this.router.navigate([NAVIGATION_RULES.entretien.url+'/'+NAVIGATION_RULES.entretien.details.replace(':id',candidat.id)]);
  }
}
