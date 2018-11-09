import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { Origine } from "../../../models/Origine";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'origineCV.component.html',
  styleUrls: ["origineCV.component.css"]
})
export class origineCVComponent implements OnInit {

  @ViewChild("origineDeleteModal")
  public origineDeleteModal;

  @ViewChild("origineModal")
  public origineModal;

  ListOrigines = [];
  origine: Origine

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


  constructor(
    private originesService: OriginesService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.origine = new Origine();
    this.originesService.findAllOrigines().subscribe(data => {
      this.ListOrigines = data;
    })
  }
  showAddModal() {
    this.reset();
    this.origineModal.show();
  }

  showEditModal(origine: any) {
    this.origine = Object.assign({}, origine); 
    this.origineModal.show();
  }

  showDeleteModal(origine: any): any {
    this.origine =  Object.assign({}, origine); 
    this.origineDeleteModal.show();
  }

  saveOrigine() {
    if (this.origine.id > 0)
      this.updateOrigine();
    else this.createOrigine();
  }

  createOrigine() {
    this.originesService.save(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV ajouté avec succés !")
      }
    })
    this.origineModal.hide();
  }

  updateOrigine() {
    this.originesService.update(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV modifié avec succés !")
      }
    })
    this.origineModal.hide();
  }

  deleteOrigine() {
    this.originesService.delete(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV Supprimer avec succés !")
      }
    })
    this.origineDeleteModal.hide();
  }

  reset() {
    this.origine= new Origine();
  }
}
