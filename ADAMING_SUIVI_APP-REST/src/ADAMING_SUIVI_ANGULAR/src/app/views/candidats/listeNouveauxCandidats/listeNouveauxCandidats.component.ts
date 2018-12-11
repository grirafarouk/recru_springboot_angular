import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
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
import { NAVIGATION_RULES, PHONE_MASK_LABEL, DATE_FORMAT, PHONE_MASK } from "../../../helper/application.constant";
import { RoutingState } from "../../../helper/routing-state.service";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { UtilisateurService } from "../../../services/utilisateur.service";
import { RegionService } from "../../../services/administrationService/region.service";
import { Region } from "../../../models/region";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'listeNouveauxCandidats.component.html',
  styleUrls: ["listeNouveauxCandidats.component.css"]

})
export class listeNouveauxCandidatsComponent implements OnInit, OnDestroy {

  titleTable="List Nouveaux Condidats "

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
      align:'center'
    },
    {
      data: 'numeroTel',
      title: 'N° Téléphone',
      visible: true,
      mask: PHONE_MASK_LABEL,
      align:'center'
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
      data: 'nomSourceur',
      title: 'Nom sourceur',
      visible: true
    },
    {
      data: 'prenomSourceur',
      title: 'Prénom sourceur',
      visible: true
    }
  ]
  mask: any[] = PHONE_MASK;
  technologies = []
  candidats: any[];
  listSourceur: any[];
  condidat: CandidateDto = new CandidateDto();
  CritereRecheche: [
    { value: '1', text: 'Moins 1 mois' },
    { value: '2', text: 'Entre 1 et 6 mois' },
    { value: '3', text: 'Plus de 6 mois' }
  ];
  region: Array<Region> = [];


  constructor(private router: Router,
    private technologiesService: TechnologieService,
    private candidatsService: CandidatsService, 
    private helperService: HelperService,
    private routingState: RoutingState,
    private notifierService: NotifierService,
    private utilisateurService: UtilisateurService,
    private regionService: RegionService) {

     }

  ngOnInit(): void {
    if(this.routingState.getPreviousUrl().indexOf('details')>-1) 
      this.condidat = this.helperService.listNouveauxCandidatRecherche;
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    }),
    this.utilisateurService.getAllSourceurs().subscribe(data=>{
      this.listSourceur=data
    })
  }
  ngOnDestroy(): void {
    this.helperService.listNouveauxCandidatRecherche = this.condidat;
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
  recherche(item, page, size,allValue) {
    return this.candidatsService.rechercheNouveauxcandidats(item, page, size)
  }

  rechercheNbr(item,allValue){
    return this.candidatsService.rechercheNouveauxcandidatsNbr(item) 
  }

  reset() {
    this.condidat = new CandidateDto();
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

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, this.titleTable);
  }
  exportAsXLSX():void {

    this.candidatsService.rechercheNouveauxcandidats(this.table.item, 0, this.table.maxlenght).subscribe(data=>{
      this.exportAsExcelFile(data, 'sample');

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
