import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../../models/Candidate';
import { CodePostal } from '../../../models/CodePostal';
import { Technologie } from '../../../models/Technologie';
import { Origine } from '../../../models/Origine';
import { TechnologieService } from '../../../services/administrationService/TechnologieService';
import { OriginesService } from '../../../services/administrationService/origines.service';
import { CodePostalService } from '../../../services/administrationService/code-postal.service';
import { CompetencesService } from '../../../services/administrationService/competences.service';
import { Competence } from '../../../models/Competence';
import { CandidatsService } from '../../../services/candidats.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Entretien } from '../../../models/Entretien';
import { Lieu } from '../../../models/Lieu';
import { LieuxService } from '../../../services/administrationService/Lieux.service.';
import { NotifierService } from 'angular-notifier';
import { RoutingState } from '../../../helper/routing-state.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { HelperService } from '../../../helper/helper.service';
import { EntretienService } from '../../../services/entretien-service';
import { Status } from '../../../models/enum/Status';
import { SessionFormation } from '../../../models/SessionFormation';
import { SessionsFormationsService } from '../../../services/sessionService/sessions-formations.service';
import { RegionService } from '../../../services/administrationService/region.service';
import { formatDate } from '@angular/common';
import { SuiviService } from '../../../services/suivi-service';
import { Suivi } from '../../../models/Suivi';
import { NAVIGATION_RULES } from '../../../helper/application.constant';
declare var jQuery: any;

@Component({
  selector: 'app-fiche-reporting',
  templateUrl: './fiche-reporting.component.html',
  styleUrls: ['./fiche-reporting.component.scss']

})
export class FicheReportingComponent implements OnInit {

  @ViewChild("detailsModal")
  public detailsModal;
  map: any;
  pdfSource;
  file;
  currentCandidat: Candidate;
  selectedRegions=[]
  competences: Array<Competence> = []


  constructor(private route: ActivatedRoute, private candidatsService: CandidatsService,
    private sanitizer: DomSanitizer, private router: Router ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { candidat: Candidate, title: string }) => {
        data.title = data.title + data.candidat.id;
        this.currentCandidat = data.candidat;
        this.candidatsService.getCvCandidats(this.currentCandidat).subscribe(res => {
          this.file = res;
          var reader = new FileReader();
          reader.onload = (e) => {
            var fileBase64Value = reader.result + ''
            this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl(fileBase64Value.replace("pdf/plain", "application/pdf"))
          }
          reader.readAsDataURL(res.data);
        })
      });
  }



   downloadPDF() {

    var url = window.URL.createObjectURL(this.file.data);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = this.file.filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }


   annuler() {
    this.router.navigate([NAVIGATION_RULES.reporting.url+'/'+NAVIGATION_RULES.reporting.listeReporting]);
  }


  showDetails() {
    this.detailsModal.show();
  }

  getStatusLabel(status){
    return Status[status];
  }
}
