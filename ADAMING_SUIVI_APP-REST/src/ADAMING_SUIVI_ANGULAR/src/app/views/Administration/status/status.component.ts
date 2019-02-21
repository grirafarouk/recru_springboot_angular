import { StatutService } from './../../../services/administrationService/StatutService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Statut } from '../../../models/Statut';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  Liststatut = [];
  statut: Statut;


  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("statutModal")
  public statutModal;


  columns = [
    {
      data: 'libelle',
      title: 'libelle'
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
    private typeFormationService: StatutService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.statut = new Statut();

    this.typeFormationService.findAllStatut().subscribe(data => {
      this.Liststatut = data;
    })
  }

  showAddModal() {
    this.reset();
    this.statutModal.show();

  }

  showDeleteModal(statut: any): any {
    this.statut = Object.assign({}, statut);
    this.deleteModal.show();
  }

  showEditModal(statut: any) {
    this.statut = Object.assign({}, statut);
    this.statutModal.show();

  }

  savelibelle() {
    if (this.statut.id > 0)
      this.updatestatut();
    else this.createstatut();
  }

  async createstatut() {
    var error = false;
    if (this.statut.libelle == "" || this.statut.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un statut valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findStatutByLibelle(this.statut.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "statut existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.save(this.statut).toPromise().then((data: Statut) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "statut ajouté avec succés !")
      }
    })
  }
    this.statutModal.hide();
  }

  async updatestatut() {
    var error = false;
    if (this.statut.libelle == "" || this.statut.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un statut valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findStatutByLibelle(this.statut.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "statut existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.update(this.statut).toPromise().then((data: Statut) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "statut  modifié avec succés !")
      }
    })
  }
    this.statutModal.hide();
  }

  delete() {
    this.typeFormationService.delete(this.statut).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "profil Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.statut = new Statut();
  }
}
