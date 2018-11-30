import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Competence } from "../../../models/Competence";
import { CompetencesService } from "../../../services/administrationService/competences.service";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'competence.component.html',
  styleUrls: ["competence.component.css"]
})
export class competenceComponent implements OnInit {

  @ViewChild("competenceDeleteModal")
  public competenceDeleteModal;

  @ViewChild("competenceModal")
  public competenceModal;

  ListCompetences = [];
  competence: Competence

  columns = [
    {
      data: 'libelle',
      title: 'Libellés'
    }
  ]
  actions = [
    {
      icon: 'fa fa-edit',
      class: 'btn btn-outline-success btn-sm',
      tooltip: 'Edit',
      action: (e) => {
        this.showEditModal(e);
      }
    },
    {
      icon: 'fa fa-trash',
      class: 'btn btn-outline-danger btn-sm',
      tooltip: 'Delete',
      action: (e) => {
        this.showDeleteModal(e);
      }
    }
  ]


  constructor(private competencesService: CompetencesService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.competence = new Competence();
    this.competencesService.findAllCompetences().subscribe(data => {
      this.ListCompetences = data;
    })
  }
  showAddModal() {
    this.reset();
    this.competenceModal.show();
  }

  showEditModal(competence: any) {
    this.competence = Object.assign({}, competence); 
    this.competenceModal.show();
  }

  showDeleteModal(competence: any): any {
    this.competence =  Object.assign({}, competence); 
    this.competenceDeleteModal.show();
  }

  saveCompetence() {
    if (this.competence.id > 0)
      this.updateCompetence();
    else this.createCompetence();
  }

  createCompetence() {
    this.competencesService.save(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Competence ajouté avec succés !")
      }
    })
    this.competenceModal.hide();
  }

  updateCompetence() {
    this.competencesService.update(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Competence modifié avec succés !")
      }
    })
    this.competenceModal.hide();
  }

  deleteCompetence() {
    this.competencesService.delete(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Competence Supprimer avec succés !")
      }
    })
    this.competenceDeleteModal.hide();
  }

  reset() {
    this.competence= new Competence();
  }
}
