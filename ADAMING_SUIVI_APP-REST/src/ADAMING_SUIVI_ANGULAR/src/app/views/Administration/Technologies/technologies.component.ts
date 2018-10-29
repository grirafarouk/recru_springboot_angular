import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Technologie } from "../../../models/Technologie";
import { TechnologieService } from "../../../services/administrationService/TechnologieService";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'technologies.component.html',
  styleUrls: ["technologies.component.css"]
})
export class technologiesComponent implements OnInit {
  @ViewChild("technologieAddModal")
  public technlogieAddModal;
  @ViewChild("technologieEditModal")
  public technlogieEditModal;
  ListTechnologies=[];
  technologie:Technologie


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private technologieService: TechnologieService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.technologie= new Technologie();

    this.technologieService.findAllTechnologies().subscribe(data=>{
      this.ListTechnologies = data;
    })
  }
  showAddModal(){
    this.reset();
    this.technlogieAddModal.show();

  }
  showEditModal(technologie: any){
    this.technologie.id = technologie.id;
    this.technologie.libelle = technologie.libelle;
    this.technologie.reporting=technologie.reporting;
   
    this.technlogieEditModal.show();

  }
  saveTechnologie(){
    this.technologieService.save(this.technologie).toPromise().then((data: Technologie) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Technologie ajouté avec succés !")
      }
    })
    this.technlogieAddModal.hide();
  }

  updateTechnologie(technologie){
    this.technologieService.update(this.technologie).toPromise().then((data: Technologie) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Technologie modifié avec succés !")
      }
    })
    this.technlogieEditModal.hide();
  }
  
  reset(){
    this.technologie.libelle = null;
    this.technologie.reporting=null;
  }
}
