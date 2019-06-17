import { MotifService } from './../../../services/administrationService/motif.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Motif } from "../../../models/Motif";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'motifHorsCible.component.html',
  styleUrls: ["motifHorsCible.component.css"]
})
export class motifHorsCibleComponent implements OnInit {
  @ViewChild("deleteModal")
  public deleteModal;

  @ViewChild("motifHorsCibleModal")
  public motifHorsCibleModal;
  pt: number;

  ListmotifHorsCible = [];
  motifHorsCible: Motif


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
    private motifHorsCibleService: MotifService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.motifHorsCible = new Motif();
    this.motifHorsCibleService.findAllMotifs().subscribe(data => {
      this.ListmotifHorsCible = data;
    })
  }



  searchingmotif(event) {
    let value = event.target.value;
    if (value != "")
      this.motifHorsCibleService.searchingmotifs(value).subscribe(data => {

        this.ListmotifHorsCible = data



      })

    else {


      this.ngOnInit();
    }
  }


  showAddModal() {
    this.reset();
    this.motifHorsCibleModal.show();
  }
  showEditModal(motifHorsCible: any) {
    this.motifHorsCible = Object.assign({}, motifHorsCible);
    this.motifHorsCibleModal.show();
  }

  showDeleteModal(motifHorsCible: any): any {
    this.motifHorsCible = Object.assign({}, motifHorsCible);
    this.deleteModal.show();
  }
  saveMotifHorsCible() {
    if (this.motifHorsCible.id > 0)
      this.updateMotifHorsCible();
    else this.createMotifHorsCible();
  }
  async createMotifHorsCible() {
    var error = false;
    if (this.motifHorsCible.libelle == "" || this.motifHorsCible.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un motif valide")
      error = true;
    }
    else {
      let mHC
      await this.motifHorsCibleService.findMotifHSByLibelle(this.motifHorsCible.libelle).toPromise().then(data => { mHC = data });
      if (mHC != null) {
        this.notifierService.notify("error", "Motif existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.motifHorsCibleService.save(this.motifHorsCible).toPromise().then((data: Motif) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Motif ajoutée avec succès !")
        }
      })
    }
    this.motifHorsCibleModal.hide();
  }

  async updateMotifHorsCible() {
    var error = false;
    if (this.motifHorsCible.libelle == "" || this.motifHorsCible.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un motif valide")
      error = true;
    }
    else {
      let mHC
      await this.motifHorsCibleService.findMotifHSByLibelle(this.motifHorsCible.libelle).toPromise().then(data => { mHC = data });
      if (mHC != null) {
        this.notifierService.notify("error", "Motif existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.motifHorsCibleService.update(this.motifHorsCible).toPromise().then((data: Motif) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Motif  modifiée avec succès !")
        }
      })
    }
    this.motifHorsCibleModal.hide();
  }

  delete() {
    this.motifHorsCibleService.delete(this.motifHorsCible).toPromise().then((data) => {
      this.ngOnInit();
      this.notifierService.notify("success", "Motif supprimé  avec succès !")
    })
    this.deleteModal.hide();
  }
  reset() {
    this.motifHorsCible.libelle = null;
  }
}
