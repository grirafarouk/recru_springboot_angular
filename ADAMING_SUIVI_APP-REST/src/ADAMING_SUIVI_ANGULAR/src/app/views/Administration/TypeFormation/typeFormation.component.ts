import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { TypeFormation } from "../../../models/TypeFormation";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'typeFormation.component.html',
  styleUrls: ["typeFormation.component.css"]
})
export class typeFormationComponent implements OnInit {

  ListtTypeFormation = [];
  typeFormation: TypeFormation


  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("typeFormationModal")
  public typeFormationModal;


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
    }]


  constructor(
    private sanitizer: DomSanitizer,
    private helperService: HelperService,
    private typeFormationService: TypeFormationService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.typeFormation = new TypeFormation();

    this.typeFormationService.findAllTypeFormation().subscribe(data => {
      this.ListtTypeFormation = data;
    })
  }

  showAddModal() {
    this.reset();
    this.typeFormationModal.show();

  }

  showDeleteModal(typeFormation: any): any {
    this.typeFormation = Object.assign({}, typeFormation);
    this.deleteModal.show();
  }

  showEditModal(typeFormation: any) {
    this.typeFormation = Object.assign({}, typeFormation);
    this.typeFormationModal.show();

  }

  saveTypeFormation() {
    if (this.typeFormation.id > 0)
      this.updateTypeFormation();
    else this.createTypeFormation();
  }

  async createTypeFormation() {
    var error = false;
    if (this.typeFormation.libelle == "" || this.typeFormation.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un type formation valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findTypeFormationByLibelle(this.typeFormation.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "Type Formation existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.save(this.typeFormation).toPromise().then((data: TypeFormation) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Type Formation ajouté avec succés !")
      }
    })
  }
    this.typeFormationModal.hide();
  }

  async updateTypeFormation() {
    var error = false;
    if (this.typeFormation.libelle == "" || this.typeFormation.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un type formation valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findTypeFormationByLibelle(this.typeFormation.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "Type Formation existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.update(this.typeFormation).toPromise().then((data: TypeFormation) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Type Formation  modifié avec succés !")
      }
    })
  }
    this.typeFormationModal.hide();
  }

  delete() {
    this.typeFormationService.delete(this.typeFormation).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Type Formatio Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.typeFormation = new TypeFormation();
  }
}
