import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { TypeFormation } from "../../../models/TypeFormation";
import { TypeFormationService } from "../../../services/administrationService/TypeFormationService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'typeFormation.component.html',
  styleUrls: ["typeFormation.component.css"]
})
export class typeFormationComponent implements OnInit {
  @ViewChild("typeFormationAddModal")
  public typeFormationAddModal;
  @ViewChild("typeFormationEditModal")
  public typeFormationEditModal;
  ListtTypeFormation=[];
  typeFormation:TypeFormation


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private typeFormationService: TypeFormationService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.typeFormation= new TypeFormation();

    this.typeFormationService.findAllTypeFormation().subscribe(data=>{
      this.ListtTypeFormation = data;
    })
  }
  showAddModal(){
    this.reset();
    this.typeFormationAddModal.show();

  }
  showEditModal(typeFormation: any){
    this.typeFormation.id = typeFormation.id;
    this.typeFormation.libelle = typeFormation.libelle;
   
    this.typeFormationEditModal.show();

  }
  saveTypeFormation(){
    this.typeFormationService.save(this.typeFormation).toPromise().then((data: TypeFormation) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Type Formation ajouté avec succés !")
      }
    })
    this.typeFormationAddModal.hide();
  }

  updateTypeFormation(typeFormation){
    this.typeFormationService.update(this.typeFormation).toPromise().then((data: TypeFormation) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Type Formation  modifié avec succés !")
      }
    })
    this.typeFormationEditModal.hide();
  }
  
  reset(){
    this.typeFormation.libelle = null;
  }
}
