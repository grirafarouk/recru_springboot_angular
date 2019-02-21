import { ProfileService } from './../../../services/administrationService/profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Profil } from '../../../models/Profil';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  Listprofile = [];
  profile: Profil;


  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("profileModal")
  public profileModal;


  columns = [
    {
      data: 'typeProfil',
      title: 'typeProfil'
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
    private typeFormationService: ProfileService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.profile = new Profil();

    this.typeFormationService.findAllTypeFormation().subscribe(data => {
      this.Listprofile = data;
    })
  }

  showAddModal() {
    this.reset();
    this.profileModal.show();

  }

  showDeleteModal(profile: any): any {
    this.profile = Object.assign({}, profile);
    this.deleteModal.show();
  }

  showEditModal(typeFormation: any) {
    this.profile = Object.assign({}, typeFormation);
    this.profileModal.show();

  }

  saveTypeFormation() {
    if (this.profile.id > 0)
      this.updateTypeFormation();
    else this.createTypeFormation();
  }

  async createTypeFormation() {
    var error = false;
    if (this.profile.typeProfil == "" || this.profile.typeProfil == undefined) {
      this.notifierService.notify("error", " Écrivez un profil valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findTypeFormationByLibelle(this.profile.typeProfil).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "profil existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.save(this.profile).toPromise().then((data: Profil) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "profil ajouté avec succés !")
      }
    })
  }
    this.profileModal.hide();
  }

  async updateTypeFormation() {
    var error = false;
    if (this.profile.typeProfil == "" || this.profile.typeProfil == undefined) {
      this.notifierService.notify("error", " Écrivez un profil valide")
      error  = true;
    }
    else {
      let typeF
      await this.typeFormationService.findTypeFormationByLibelle(this.profile.typeProfil).toPromise().then(data => { typeF = data });
      if (typeF != null) {
        this.notifierService.notify("error", "profil existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.typeFormationService.update(this.profile).toPromise().then((data: Profil) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "profil  modifié avec succés !")
      }
    })
  }
    this.profileModal.hide();
  }

  delete() {
    this.typeFormationService.delete(this.profile).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "profil Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.profile = new Profil();
  }
}
