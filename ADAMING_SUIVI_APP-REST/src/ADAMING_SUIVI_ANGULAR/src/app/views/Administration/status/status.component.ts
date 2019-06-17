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
  pt: number;


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
    private statutService: StatutService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.statut = new Statut();
    this.statutService.findAllStatut().subscribe(data => {
      this.Liststatut = data;
    })
  }

  showAddModal() {
    this.reset();
    this.statutModal.show();

  }
  searchingstatut(event) {
    let value = event.target.value;
    if (value != "")
      this.statutService.searchingStatuts(value).subscribe(data => {

        this.Liststatut = data



      })

    else {


      this.ngOnInit();
    }
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
    if (this.statut.id > -1)
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
      await this.statutService.findStatutByLibelle(this.statut.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "statut existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.statutService.save(this.statut).toPromise().then((data: Statut) => {
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
      await this.statutService.findStatutByLibelle(this.statut.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "statut existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.statutService.update(this.statut).toPromise().then((data: Statut) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "statut  modifié avec succés !")
      }
    })
  }
    this.statutModal.hide();
  }

  delete() {
    this.statutService.delete(this.statut).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "statut Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.statut = new Statut();
  }
}
