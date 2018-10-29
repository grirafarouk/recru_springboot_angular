import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Motif } from "../../../models/Motif";
import { MotifService } from "../../../services/administrationService/motif.service";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'motifHorsCible.component.html',
  styleUrls: ["motifHorsCible.component.css"]
})
export class motifHorsCibleComponent implements OnInit {
  @ViewChild("motifHorsCibleAddModal")
  public motifHorsCibleAddModal;
  @ViewChild("motifHorsCibleEditModal")
  public motifHorsCibleEditModal;
  ListmotifHorsCible=[];
  motifHorsCible:Motif


  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private motifHorsCibleService: MotifService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.motifHorsCible= new Motif();
    this.motifHorsCibleService.findAllMotifs().subscribe(data=>{
      this.ListmotifHorsCible = data;
    })
  }
  showAddModal(){
    this.reset();
    this.motifHorsCibleAddModal.show();
  }
  showEditModal(motifHorsCible: any){
    this.motifHorsCible.id = motifHorsCible.id;
    this.motifHorsCible.libelle = motifHorsCible.libelle;
   
    this.motifHorsCibleEditModal.show();
  }
  saveMotifHorsCible(){
    this.motifHorsCibleService.save(this.motifHorsCible).toPromise().then((data: Motif) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Motif ajouté avec succés !")
      }
    })
    this.motifHorsCibleAddModal.hide();
  }

  updateMotifHorsCible(clientSession){
    this.motifHorsCibleService.update(this.motifHorsCible).toPromise().then((data: Motif) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Motif  modifié avec succés !")
      }
    })
    this.motifHorsCibleEditModal.hide();
  }
  
  reset(){
    this.motifHorsCible.libelle = null;
  }
}
