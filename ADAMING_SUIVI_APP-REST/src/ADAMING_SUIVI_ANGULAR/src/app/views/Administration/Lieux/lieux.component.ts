import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { LieuxService } from "../../../services/administrationService/Lieux.service.";
import { Lieu } from "../../../models/Lieu";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'lieux.component.html',
  styleUrls: ["lieux.component.css"]
})
export class lieuxComponent implements OnInit {
  @ViewChild("deleteModal")
  public deleteModal;
  @ViewChild("lieuModal")
  public lieuModal;
  ListLieux=[];
  lieu:Lieu
  columns = [
    {
      data: 'libelle',
      title: 'Libellés'
    },
    {
      data: 'adresseAdaming',
      title: 'Adresses'
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
   private lieuxService: LieuxService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.lieu= new Lieu();

    this.lieuxService.findAllLieux().subscribe(data=>{
      this.ListLieux = data;
    })
  }
  showAddModal(){
    this.reset();
    this.lieuModal.show();

  }
  showEditModal(lieu: any){
    this.lieu = Object.assign({}, lieu);
    this.lieuModal.show();

  }
  showDeleteModal(lieu: any): any {
    this.lieu = Object.assign({}, lieu);
    this.deleteModal.show();
  }
  saveLieu() {
    if (this.lieu.id > 0)
      this.updateLieu();
    else this.createLieu();
  }
  createLieu(){
    this.lieuxService.save(this.lieu).toPromise().then((data: Lieu) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Lieu ajouté avec succés !")
      }
    })
    this.lieuModal.hide();
  }

  updateLieu(){
    this.lieuxService.update(this.lieu).toPromise().then((data: Lieu) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Lieu modifié avec succés !")
      }
    })
    this.lieuModal.hide();
  }
  
  delete() {
    this.lieuxService.delete(this.lieu).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Lieu Supprimer avec succés !")
    })
    this.deleteModal.hide();
  }
  reset(){
    this.lieu = new Lieu();
  }
}
