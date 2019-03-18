import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { ClientSession } from "../../../models/ClientSession";
import { ClientSessionService } from "../../../services/administrationService/clientSessionService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'clientSession.component.html',
  styleUrls: ["clientSession.component.css"]
})
export class clientSessionComponent implements OnInit {
  @ViewChild("deleteModal")
  public deleteModal;
  @ViewChild("clientSessionModal")
  public clientSessionModal;
  ListclientSession=[];

  clientSession:ClientSession
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
   private clientSessionService: ClientSessionService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.clientSession= new ClientSession();
    this.clientSessionService.findAllClientSession().subscribe(data=>{
      this.ListclientSession = data;
    })
  }

  showDeleteModal(clientSession: any): any {
    this.clientSession = Object.assign({}, clientSession);
    this.deleteModal.show();
  }
  saveClientSession() {
    if (this.clientSession.id > 0)
      this.updateClientSession();
    else this.createClientSession();
  }

  showAddModal(){
    this.reset();
    this.clientSessionModal.show();
  }
  showEditModal(clientSession){
    this.clientSession = Object.assign({}, clientSession);
    this.clientSessionModal.show();
  }
  async createClientSession(){
    var error = false;
    if (this.clientSession.libelle == "" || this.clientSession.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un client session valide")
      error  = true;
    }
    else {
      let clS
      await this.clientSessionService.findClientSessionByLibelle(this.clientSession.libelle).toPromise().then(data => { clS = data });
      if (clS != null) {
        this.notifierService.notify("error", "Client Session existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.clientSessionService.save(this.clientSession).toPromise().then((data: ClientSession) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Client Session ajouté avec succés !")
      }
    })
  }
    this.clientSessionModal.hide();
  }

  async updateClientSession(){
    var error = false;
    if (this.clientSession.libelle == "" || this.clientSession.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un client session valide")
      error  = true;
    }
    else {
      let clS
      await this.clientSessionService.findClientSessionByLibelle(this.clientSession.libelle).toPromise().then(data => { clS = data });
      if (clS != null) {
        this.notifierService.notify("error", "Client Session existe déjà  !")
        error  = true;
      }
    }
    if(!error)
    {
    this.clientSessionService.update(this.clientSession).toPromise().then((data: ClientSession) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Client Session  modifié avec succés !")
      }
    })
  }
    this.clientSessionModal.hide();
  }
    delete() {
    this.clientSessionService.delete(this.clientSession).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Client Session Supprimer avec succés !")
    })
    this.deleteModal.hide();
  }
  reset(){
    this.clientSession= new ClientSession();
  }
}
