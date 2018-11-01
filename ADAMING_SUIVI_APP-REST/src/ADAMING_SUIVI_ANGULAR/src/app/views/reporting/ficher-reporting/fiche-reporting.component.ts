import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../../models/candidate';
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
import { Profil } from '../../../models/enum/Profil';
import { EntretienService } from '../../../services/entretien-service';
import { Status } from '../../../models/enum/Status';
import { SessionFormation } from '../../../models/SessionFormation';
import { SessionsFormationsService } from '../../../services/sessionService/sessions-formations.service';
import { RegionService } from '../../../services/administrationService/region.service';
import { formatDate } from '@angular/common';
import { SuiviService } from '../../../services/suivi-service';
import { Suivi } from '../../../models/Suivi';
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
    private sanitizer: DomSanitizer, private router: Router,
    private routingState: RoutingState,
    private helperService: HelperService, private competencesService: CompetencesService ) { }

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
        this.competencesService.findAllCompetences().subscribe(data => {
          this.competences = data;
          this.currentCandidat.candidatCompetence.forEach((obj, i) => {
            this.competences.forEach((obj2, i) => {
              if (obj2.id == obj.id) {
                obj2.selected = true;
              }
            });
          });
        })
       this.selectedRegions = []
        if (this.currentCandidat.suivi.regions != undefined) this.currentCandidat.suivi.regions.forEach(element => {
          this. selectedRegions.push(element.id + "");
        });
       // this.map.setSelectedRegions(selectedRegions);
      });
  }



  private downloadPDF() {

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


  private annuler() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }



  ngAfterViewInit() {
    this.map = jQuery('#france-map').vectorMap({
      map: 'fr_regions_mill',
      hoverOpacity: 0.5,
      hoverColor: "#EC0000",
      backgroundColor: "#ffffff",
      color: "#FACC2E",
      borderColor: "#000000",
      selectedColor: "#EC0000",
      multiSelectRegion: true,
      selectedRegions:this.selectedRegions,
      enableZoom: true,
      showTooltip: true,
      onRegionClick: function (event, code, region) {
        event.preventDefault();
      }
    });
  }


  showDetails() {
    console.log("aa")
    this.detailsModal.show();
  }
}
