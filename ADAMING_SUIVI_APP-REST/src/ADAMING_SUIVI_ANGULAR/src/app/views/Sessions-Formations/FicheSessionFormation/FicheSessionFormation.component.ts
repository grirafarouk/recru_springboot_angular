import { Candidate } from './../../../models/Candidate';
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsFormationsService } from "../../../services/sessionService/sessions-formations.service";
import { RoutingState } from "../../../helper/routing-state.service";
import { SessionFormation } from "../../../models/SessionFormation";
import { HelperService } from "../../../helper/helper.service";
import { CandidatsService } from "../../../services/candidats.service";
import { NAVIGATION_RULES } from "../../../helper/application.constant";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { listereporting } from './listereporting';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  templateUrl: 'FicheSessionFormation.component.html',
  styleUrls: ["FicheSessionFormation.component.css"]
})
export class FicheSessionFormationComponent implements OnInit {

  constructor(private sessionFormationService: SessionsFormationsService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private candidatsService: CandidatsService,
    private routingState: RoutingState,
    private notifierService: NotifierService) { }
  session: any = {};
  candidats = [];
  candidas: Array<Candidate> = [];
  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  loading = false;
  liste_reporting: Array<listereporting> = [];
  ngOnInit() {
    this.route.data
      .subscribe((data: { session: SessionFormation, title: string }) => {
        this.session = data.session;
        data.title = data.title + this.session.id;
        this.rechercheCandidat();
      })
    this.sessionFormationService.getListCandidats(this.session, 0, 10000000).subscribe(data => {
      this.candidas = data.results;
      this.candidas.forEach(element => {
        let l = new listereporting();
        l.nom = element.nom;
        l.prenom = element.prenom;
        l.email = element.email;
        l.tel = element.numeroTel;
        l.sourceur = element.creePar.nom + element.creePar.prenom;
        if (element.docConsult == true) {
          l.acceptation = 'oui';
        }
        else { l.acceptation = 'non'; }
        if (element.docRefus == true) {
          l.refus = 'oui';
        }
        else { l.refus = 'non'; }
        if (this.liste_reporting.indexOf(l) === -1)
          this.liste_reporting.push(l);
      });
    })

  }
  rechercheCandidat() {
    this.loading = true;
    this.currentPage = 1;
    let callBack = (e) => {
      this.notifierService.notify("info", "Nombre Candidat : " + this.maxlenght)
    }
    this.doRechercheCandidat(callBack);
  }

  doRechercheCandidat(callBack?) {
    let page = (this.currentPage - 1) * this.size;
    this.sessionFormationService.getListCandidats(this.session, page, this.size).subscribe(data => {
      this.maxlenght = data.total;
      this.candidats = data.results;
      this.lastPage = Math.ceil(this.maxlenght / this.size)
      this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
      this.loading = false;
      if (callBack) callBack();
    }, error => {
      this.loading = false
    })
  }

  setPage(p) {
    this.loading = true;
    this.currentPage = p;
    this.pages = this.helperService.generatePages(this.currentPage, this.lastPage)
    this.doRechercheCandidat();
  }

   annuler() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }
  modelChanged(currentCandidat, opps) {
    currentCandidat[opps] = false;
    this.candidatsService.updateCandidat(currentCandidat).subscribe();
  }

  activerDesactiverSession() {
    if (this.session.factif != null && this.session.factif) {
      this.notifierService.notify("success", "Succès !! " + "Session Désactivée !");
      this.session.factif = false;
    }
    else {
      this.session.factif = true;
      this.notifierService.notify("success", "Succès !! " + "Session Activée !");
    }
    this.sessionFormationService.updateSession(this.session).subscribe(data => {

    })
  }

  openDetails(candidat) {
    this.router.navigate([NAVIGATION_RULES.entretien.url + '/' + NAVIGATION_RULES.entretien.details.replace(':id', candidat.id)]);
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'Liste reporting' + EXCEL_EXTENSION);
  }
  exportAsXLSX(): void {
    this.exportAsExcelFile(this.liste_reporting, 'sample');
    this.liste_reporting = [];
  }

}
