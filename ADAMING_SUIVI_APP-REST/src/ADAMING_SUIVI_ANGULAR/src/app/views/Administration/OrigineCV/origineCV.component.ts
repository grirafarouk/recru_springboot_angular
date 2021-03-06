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

  @ViewChild("origineDeleteModal")
  public origineDeleteModal;
  pt: number;

  @ViewChild("origineModal")
  public origineModal;

  ListOrigines = [];
  origine: Origine

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
    }
  ]


  constructor(
    private originesService: OriginesService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.origine = new Origine();
    this.originesService.findAllOrigines().subscribe(data => {
      this.ListOrigines = data;
    })
  }
  showAddModal() {
    this.reset();
    this.origineModal.show();
  }


  searchingcv(event) {
    console.log(this.ListOrigines)
    console.log(event.target.value)
    let value = event.target.value;
    if (value != '') {
      this.originesService.searchingorigines(value).subscribe(data => {

        this.ListOrigines = data


      })






    }


else{


  this.ngOnInit()
}

  }


  showEditModal(origine: any) {
    this.origine = Object.assign({}, origine);
    this.origineModal.show();
  }

  showDeleteModal(origine: any): any {
    this.origine = Object.assign({}, origine);
    this.origineDeleteModal.show();
  }

  saveOrigine() {
    if (this.origine.id > 0)
      this.updateOrigine();
    else this.createOrigine();
  }

  async createOrigine() {
    var error = false;
    if (this.origine.libelle == "" || this.origine.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un origine cv valide")
      error = true;
    }
    else {
      let org
      await this.originesService.findOrigineByLibelle(this.origine.libelle).toPromise().then(data => { org = data });
      if (org != null) {
        this.notifierService.notify("error", "Origine cv existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.originesService.save(this.origine).toPromise().then((data: Origine) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Origine CV ajouté avec succés !")
        }
      })
    }
    this.origineModal.hide();
  }

  async updateOrigine() {
    var error = false;
    if (this.origine.libelle == "" || this.origine.libelle == undefined) {
      this.notifierService.notify("error", " Écrivez un origine cv valide")
      error = true;
    }
    else {
      let org
      await this.originesService.findOrigineByLibelle(this.origine.libelle).toPromise().then(data => { org = data });
      if (org != null) {
        this.notifierService.notify("error", "Origine cv existe déjà  !")
        error = true;
      }
    }
    if (!error) {
      this.originesService.update(this.origine).toPromise().then((data: Origine) => {
        this.ngOnInit();
        if (data != null) {
          this.notifierService.notify("success", "Origine CV modifié avec succés !")
        }
      })
    }
    this.origineModal.hide();
  }

  deleteOrigine() {
    this.originesService.delete(this.origine).toPromise().then((data: Origine) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Origine CV Supprimer avec succés !")
      }
    })
    this.origineDeleteModal.hide();
  }

  reset() {
    this.origine = new Origine();
  }
}
