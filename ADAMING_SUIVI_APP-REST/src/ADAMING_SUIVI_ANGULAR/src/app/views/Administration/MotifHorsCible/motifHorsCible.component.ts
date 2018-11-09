import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Motif } from "../../../models/Motif";
import { MotifService } from "../../../services/administrationService/motif.service";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'motifHorsCible.component.html',
  styleUrls: ["motifHorsCible.component.css"]
})
export class motifHorsCibleComponent implements OnInit {
  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("motifHorsCibleModal")
  public motifHorsCibleModal;
  
  ListmotifHorsCible=[];
  motifHorsCible:Motif


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
   private motifHorsCibleService: MotifService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.motifHorsCible= new Motif();
    this.motifHorsCibleService.findAllMotifs().subscribe(data=>{
      this.ListmotifHorsCible = data;
    })
  }
  showAddModal(){
    this.reset();
    this.motifHorsCibleModal.show();
  }
  showEditModal(motifHorsCible: any){
    this.motifHorsCible= Object.assign({}, motifHorsCible);
    this.motifHorsCibleModal.show();
  }

  showDeleteModal(motifHorsCible: any): any {
    this.motifHorsCible = Object.assign({}, motifHorsCible);
    this.deleteModal.show();
  }
  saveMotifHorsCible() {
    if (this.motifHorsCible.id > 0)
      this.updateMotifHorsCible();
    else this.createMotifHorsCible();
  }
  createMotifHorsCible(){
    this.motifHorsCibleService.save(this.motifHorsCible).toPromise().then((data: Motif) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Motif ajouté avec succés !")
      }
    })
    this.motifHorsCibleModal.hide();
  }

  updateMotifHorsCible(){
    this.motifHorsCibleService.update(this.motifHorsCible).toPromise().then((data: Motif) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Motif  modifié avec succés !")
      }
    })
    this.motifHorsCibleModal.hide();
  }

  delete() {
    this.motifHorsCibleService.delete(this.motifHorsCible).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Lieu Supprimer avec succés !")
    })
    this.deleteModal.hide();
  }
  reset(){
    this.motifHorsCible.libelle = null;
  }
}
