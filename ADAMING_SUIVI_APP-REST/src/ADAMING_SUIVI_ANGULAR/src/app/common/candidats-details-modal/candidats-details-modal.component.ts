import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { Candidate } from "../../models/Candidate";
import { Status } from "../../models/enum/Status";
import { CompetencesService } from "../../services/administrationService/competences.service";
import { CandidatsService } from "../../services/candidats.service";
import { HelperService } from "../../helper/helper.service";
import { Competence } from "../../models/Competence";
declare var jQuery: any;

@Component({
    selector: 'candidats-details-modal',
    templateUrl: './candidats-details-modal.component.html',
    styleUrls: ['./candidats-details-modal.component.css']
})
export class CandidatsDetailsModalComponent implements OnInit {
    @Input()
    currentCandidat: Candidate;

    @ViewChild("detailsModal")
    detailsModal


    map: any;
    selectedRegions=[]
    competences: Array<Competence> = []

    
    constructor(private candidatsService: CandidatsService, 
        private helperService: HelperService, 
        private competencesService: CompetencesService ) { }


    ngOnInit() {
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
      });}
    public show(){
        this.detailsModal.show();
    }
    public hide(){
        this.detailsModal.hide();
    }
    getStatusLabel(status){
        return Status[status];
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
    
}