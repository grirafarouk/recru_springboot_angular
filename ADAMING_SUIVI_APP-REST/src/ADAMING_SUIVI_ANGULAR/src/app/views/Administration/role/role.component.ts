import { RoleService } from '../../../services/administrationService/role.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/Role';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  listRole = [];
  role: Role;


  @ViewChild("deleteModal")
  public deleteModal;
  pt: number;

  @ViewChild("roleModal")
  public roleModal;


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
    private roleService: RoleService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.role = new Role();
    this.roleService.findAllRole().subscribe(data => {
      this.listRole = data;
    })
  }

  showAddModal() {
    this.reset();
    this.roleModal.show();

  }
  searchingrole(event) {
    let value = event.target.value;
    if (value != "")
      this.roleService.searchingRoles(value).subscribe(data => {

        this.listRole = data



      })

    else {


      this.ngOnInit();
    }
  }
  showDeleteModal(role: any): any {
    this.role = Object.assign({}, role);
    this.deleteModal.show();
  }

  showEditModal(role: any) {
    this.role = Object.assign({}, role);
    this.roleModal.show();
  }

  saveRole() {
    if (this.role.id > -1)
      this.updateRole();
    else this.createRole();
  }

  async createRole() {
    var error = false;
    if (this.role.libelle == "" || this.role.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un Profil valide")
      error = true;
    }
    else {
      let role
      await this.roleService.findRoleByLibelle(this.role.libelle).toPromise().then(data => { role = data });
      if (role != null) {
        this.notifierService.notify("error", "Profil existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.roleService.save(this.role).toPromise().then((data: Role) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Profil ajouté avec succés !")
        }
      })
    }
    this.roleModal.hide();
  }

  async updateRole() {
    var error = false;
    if (this.role.libelle == "" || this.role.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un Profil valide")
      error = true;
    }
    else {
      let role
      await this.roleService.findRoleByLibelle(this.role.libelle).toPromise().then(data => { role = data });
      if (role != null) {
        this.notifierService.notify("error", "Profil existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.roleService.update(this.role).toPromise().then((data: Role) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Profil  modifié avec succés !")
        }
      })
    }
    this.roleModal.hide();
  }

  delete() {
    this.roleService.delete(this.role).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Profil Supprimer avec succés !")

    })
    this.deleteModal.hide();
  }

  reset() {
    this.role = new Role();
  }
}
