import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { OriginesService } from "../../../services/administrationService/origines.service";
import { Origine } from "../../../models/Origine";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'origineCV.component.html',
  styleUrls: ["origineCV.component.css"]
})
export class origineCVComponent implements OnInit {
  @ViewChild("origineAddModal")
  public origineAddModal;
  @ViewChild("origineEditModal")
  public origineEditModal;
  ListOrigines=[];
  origine:Origine


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private originesService: OriginesService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.origine= new Origine();

    this.originesService.findAllOrigines().subscribe(data=>{
      this.ListOrigines = data;
    })
  }
  showAddModal(){
    this.reset();
    this.origineAddModal.show();

  }
  showEditModal(origine: any){
    this.origine.id = origine.id;
    this.origine.libelle = origine.libelle;
   
    this.origineEditModal.show();

  }
  saveOrigine(){
    this.originesService.save(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV ajouté avec succés !")
      }
    })
    this.origineAddModal.hide();
  }

  updateOrigine(origine){
    this.originesService.update(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV modifié avec succés !")
      }
    })
    this.origineEditModal.hide();
  }
  
  reset(){
    this.origine.libelle=null;
  }
}
