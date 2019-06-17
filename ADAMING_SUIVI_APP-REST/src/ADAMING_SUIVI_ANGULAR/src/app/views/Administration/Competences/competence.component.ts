import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Competence } from "../../../models/Competence";
import { CompetencesService } from "../../../services/administrationService/competences.service";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'competence.component.html',
  styleUrls: ["competence.component.css"]
})
export class competenceComponent implements OnInit {

  @ViewChild("competenceDeleteModal")
  public competenceDeleteModal;

  @ViewChild("competenceModal")
  public competenceModal;

  ListCompetences = [];
  competence: Competence

  pt: number;


  constructor(private competencesService: CompetencesService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.competence = new Competence();
    this.competencesService.findAllCompetences().subscribe(data => {
      this.ListCompetences = data;
    })
  }
  showAddModal() {
    this.reset();
    this.competenceModal.show();
  }
    searchingcompetence(event){
    let value=event.target.value;
    if(value!="")
   this.competencesService.searchingcompetence(value).subscribe(data=>{

  this.ListCompetences=data



   })

else{


  this.ngOnInit(); 
}
  }

  showEditModal(competence: any) {
    this.competence = Object.assign({}, competence); 
    this.competenceModal.show();
  }

  showDeleteModal(competence: any): any {
    this.competence =  Object.assign({}, competence); 
    this.competenceDeleteModal.show();
  }

  saveCompetence() {
    if (this.competence.id > 0)
      this.updateCompetence();
    else this.createCompetence();
  }

  async createCompetence() {
    var error = false;

    if (this.competence.libelle == "" || this.competence.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez une competence valide")
      error  = true;
    }
    else {
      let comp
      await this.competencesService.getCompetenceByLibelle(this.competence.libelle).toPromise().then(data => { comp = data });
      if (comp != null) {
        this.notifierService.notify("error", "competence existe déjà  !")
        error  = true;
      }
    }

    if(!error)
    {
    this.competencesService.save(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Compétence ajoutée avec succès !")
      }
    })
  }
    this.competenceModal.hide();
  }

  updateCompetence() {
    var error = false;

    if (this.competence.libelle == "" || this.competence.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez une competence valide")
      error  = true;
    }
    if(!error)
    {
    this.competencesService.update(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Compétence modifiée avec succès !")
      }
    })
  }
    this.competenceModal.hide();
  }

  deleteCompetence() {
    this.competencesService.delete(this.competence).toPromise().then((data: Competence) => {
      this.ngOnInit();
        this.notifierService.notify("success", "Compétence supprimée avec succès !")
    })
    this.competenceDeleteModal.hide();
  }

  reset() {
    this.competence= new Competence();
  }
}
