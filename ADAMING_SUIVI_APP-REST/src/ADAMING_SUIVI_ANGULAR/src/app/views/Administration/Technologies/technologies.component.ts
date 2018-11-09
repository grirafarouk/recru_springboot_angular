import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Technologie } from "../../../models/Technologie";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'technologies.component.html',
  styleUrls: ["technologies.component.css"]
})
export class technologiesComponent implements OnInit {
  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("technologieModal")
  public technologieModal;


  ListTechnologies = [];
  technologie: Technologie

  columns = [
    {
      data: 'libelle',
      title: 'Libellés'
    },
    {
      data: 'reporting',
      title: 'Reporting',
      boolean: true
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
    }]

  constructor(
    private technologieService: TechnologieService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.technologie = new Technologie();

    this.technologieService.findAllTechnologies().subscribe(data => {
      this.ListTechnologies = data;
    })
  }

  showAddModal() {
    this.reset();
    this.technologieModal.show();

  }
  showEditModal(technologie: any) {
    this.technologie = Object.assign({}, technologie);
    this.technologieModal.show();

  }

  showDeleteModal(technologie: any): any {
    this.technologie = Object.assign({}, technologie);
    this.deleteModal.show();
  }
  saveTechnologie() {
    if (this.technologie.id > 0)
      this.updateTechnologie();
    else this.createTechnologie();
  }

  createTechnologie() {
    this.technologieService.save(this.technologie).toPromise().then((data: Technologie) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Technologie ajouté avec succés !")
      }
    })
    this.technologieModal.hide();
  }

  updateTechnologie() {
    this.technologieService.update(this.technologie).toPromise().then((data: Technologie) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Technologie modifié avec succés !")
      }
    })
    this.technologieModal.hide();
  }

  delete() {
    this.technologieService.delete(this.technologie).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Technologie Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }
  reset() {
    this.technologie.libelle = null;
    this.technologie.reporting = null;
  }
}
