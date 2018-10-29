import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { ClienSession } from "../../../models/ClientSession";
import { ClientSessionService } from "../../../services/administrationService/clientSessionService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'clientSession.component.html',
  styleUrls: ["clientSession.component.css"]
})
export class clientSessionComponent implements OnInit {
  @ViewChild("clientSessionAddModal")
  public clientSessionAddModal;
  @ViewChild("clientSessionEditModal")
  public clientSessionEditModal;
  ListclientSession=[];
  clientSession:ClienSession


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private clientSessionService: ClientSessionService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.clientSession= new ClienSession();
    this.clientSessionService.findAllClientSession().subscribe(data=>{
      this.ListclientSession = data;
    })
  }
  showAddModal(){
    this.reset();
    this.clientSessionAddModal.show();
  }
  showEditModal(clientSession: any){
    this.clientSession.id = clientSession.id;
    this.clientSession.libelle = clientSession.libelle;
   
    this.clientSessionEditModal.show();
  }
  saveClientSession(){
    this.clientSessionService.save(this.clientSession).toPromise().then((data: ClienSession) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Client Session ajouté avec succés !")
      }
    })
    this.clientSessionAddModal.hide();
  }

  updateClientSession(clientSession){
    this.clientSessionService.update(this.clientSession).toPromise().then((data: ClienSession) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Client Session  modifié avec succés !")
      }
    })
    this.clientSessionEditModal.hide();
  }
  
  reset(){
    this.clientSession.libelle = null;
  }
}
