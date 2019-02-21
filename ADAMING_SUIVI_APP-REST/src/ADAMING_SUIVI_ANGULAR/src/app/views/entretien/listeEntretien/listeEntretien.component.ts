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
import * as _moment from 'moment';
import { StatutService } from "../../../services/administrationService/StatutService";


@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeEntretien.component.html',
  styleUrls: ["listeEntretien.component.css"]
})
export class listeEntretienComponent implements OnInit {
  
  regex = new RegExp('^([a-zA-Z]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+$');
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
      data: 'statut',
      title: 'Délai Traitement	',
      visible: false,
      html: false,
      rendered: (e) => {
        return e.dateEntretien != null && e.dateInscription!=null 
        ?Math.ceil((new Date(   _moment(e.dateEntretien).format("MM/DD/YYYY")   ).getTime() -    new Date(   _moment(e.dateInscription).format("MM/DD/YYYY")   ).getTime()) / (1000 * 3600 * 24))+" (J)" : " - "
      }
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
      visible:false,
    },
    {
      data:'statut',
      title:'Statut',
      visible:true,
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
      rendered :function (candidat) : number {
        if (candidat.noteTotale!=null){
          return candidat.noteTotale * 2;
        }
      },
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
  statuts=[]
  listCarge: any[];
  refStatut = this.helperService.buildStatutArray();


  constructor(private originesService:OriginesService,private technologiesService:TechnologieService,
    private sanitizer: DomSanitizer,private candidatsService:CandidatsService,  private router:Router,
    private notifierService:NotifierService,private competencesService:CompetencesService,private helperService:HelperService,
    private lieuxService:LieuxService,private statutservice:StatutService,   private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.technologiesService.findAllTechnologies().subscribe(data=>{
    this.technologies = data;
    })
    this.statutservice.findAllStatut().subscribe(data=>
     {
      this.statuts=data;
     } 
      )
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
