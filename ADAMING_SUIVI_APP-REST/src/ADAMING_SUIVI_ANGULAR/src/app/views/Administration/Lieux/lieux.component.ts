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
  @ViewChild("lieuAddModal")
  public lieuAddModal;
  @ViewChild("lieuEditModal")
  public lieuEditModal;
  ListLieux=[];
  lieu:Lieu


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
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
    this.lieuAddModal.show();

  }
  showEditModal(lieu: any){
    this.lieu.id = lieu.id;
    this.lieu.libelle = lieu.libelle;
    this.lieu.adresseAdaming=lieu.adresseAdaming;
   
    this.lieuEditModal.show();

  }
  saveLieu(){
    this.lieuxService.save(this.lieu).toPromise().then((data: Lieu) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Lieu ajouté avec succés !")
      }
    })
    this.lieuAddModal.hide();
  }

  updateLieu(lieu){
    this.lieuxService.update(this.lieu).toPromise().then((data: Lieu) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Lieu modifié avec succés !")
      }
    })
    this.lieuEditModal.hide();
  }
  
  reset(){
    this.lieu.libelle=null;
    this.lieu.adresseAdaming=null;
  }
}
