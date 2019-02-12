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
  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  loading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { session: SessionFormation, title: string }) => {
        this.session = data.session;
        data.title = data.title + this.session.id;
        this.rechercheCandidat();
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

  private annuler() {
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
  
  openDetails(candidat){
    this.router.navigate([NAVIGATION_RULES.entretien.url+'/'+NAVIGATION_RULES.entretien.details.replace(':id',candidat.id)]);
  }
}
