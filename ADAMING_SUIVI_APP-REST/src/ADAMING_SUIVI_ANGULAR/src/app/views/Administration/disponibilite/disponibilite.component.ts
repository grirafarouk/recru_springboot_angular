import { disponibiliteService } from './../../../services/administrationService/disponibiliteService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Disponibilite } from '../../../models/Disponibilite';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.scss']
})
export class DisponibiliteComponent implements OnInit {

  Listdisponibilite = [];
  disponibilite: Disponibilite;
 
  @ViewChild("deleteModal")
  public deleteModal;
  pt: number;

  @ViewChild("disponibiliteModal")
  public  disponibiliteModal;


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
    // tslint:disable-next-line:no-shadowed-variable
    private disponibiliteService: disponibiliteService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.disponibilite = new Disponibilite();

    this.disponibiliteService.findAllDisponibilite().subscribe(data => {
      this.Listdisponibilite = data;
    })
  }

  showAddModal() {
    this.reset();
    this.disponibiliteModal.show();

  }
  searchingdisponibilite(event) {
    let value = event.target.value;
    if (value != "")
      this.disponibiliteService.searchingDisponibilites(value).subscribe(data => {

        this.Listdisponibilite = data

      

      })

    else {


      this.ngOnInit();
    }
  }
  showDeleteModal(disponibilite: any): any {
    this.disponibilite = Object.assign({}, disponibilite);
    this.deleteModal.show();
  }

  showEditModal(disponibilite: any) {
    this.disponibilite = Object.assign({}, disponibilite);
    this.disponibiliteModal.show();

  }

  savelibelle() {
    if (this.disponibilite.id > -1)
      this.updatedisponibilite();
    else this.createdisponibilite();
  }

  async createdisponibilite() {
    var error = false;
    if (this.disponibilite.libelle == "" || this.disponibilite.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez une disponibilite valide")
      error  = true;
    }
    else {
      let typeF
      await this.disponibiliteService.findDisponibiliteByLibelle(this.disponibilite.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "disponibilite existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.disponibiliteService.save(this.disponibilite).toPromise().then((data: Disponibilite) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "disponibilite ajouté avec succés !")
      }
    })
  }
    this.disponibiliteModal.hide();
  }

  async updatedisponibilite() {
    var error = false;
    if (this.disponibilite.libelle == "" || this.disponibilite.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez une disponibilite valide")
      error  = true;
    }
    else {
      let typeF
      await this.disponibiliteService.findDisponibiliteByLibelle(this.disponibilite.libelle).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "disponibilite existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.disponibiliteService.update(this.disponibilite).toPromise().then((data: Disponibilite) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "disponibilite  modifié avec succés !")
      }
    })
  }
    this.disponibiliteModal.hide();
  }

  delete() {
    this.disponibiliteService.delete(this.disponibilite).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "disponibilite Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.disponibilite = new Disponibilite();
  }
}
