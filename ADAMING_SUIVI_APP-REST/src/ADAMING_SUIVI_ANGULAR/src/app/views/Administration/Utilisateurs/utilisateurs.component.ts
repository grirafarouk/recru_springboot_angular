import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { Utilisateur } from "../../../models/Utilisateur";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'utilisateurs.component.html',
  styleUrls: ["utilisateurs.component.css"]
})
export class utilisateursComponent implements OnInit {

  @ViewChild("utilisateurModal")
  public utilisateurModal;
  ListUtilistaeur = []
  utilisateur: Utilisateur
  refProfil = this.helperService.buildProfilArray();



  columns = [
    {
      data: 'login',
      title: 'Login'
    },
    {
      data: 'profil',
      title: 'Profil',
    },
    {
      data: 'actif',
      title: 'Actif',
      boolean: true,
      align: 'center',
      width: '10%'
    },
    {
      data: 'reporting',
      title: 'Reporting',
      boolean: true,
      align: 'center',
      width: '10%'
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
    }
  ]


  constructor(
    private sanitizer: DomSanitizer,
    private helperService: HelperService,
    private utilisateurService: UtilisateurService,
    private notifierService: NotifierService

  ) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
    this.utilisateurService.getAllUser().subscribe(data => {
      this.ListUtilistaeur = data;
    })
  }

  showAddModal() {
    this.reset();
    this.utilisateurModal.show();
  }

  createUtilisateur() {
    this.utilisateurService.save(this.utilisateur).toPromise().then((data: Utilisateur) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Utilisateur ajouté avec succés !")
      }
    })
    this.utilisateurModal.hide();
  }

  showEditModal(utilisateur: any) {
    this.utilisateur =  Object.assign({}, utilisateur);
    this.utilisateurModal.show();

  }

  updateUtilisateur() {
    this.utilisateurService.update(this.utilisateur).toPromise().then((data: Utilisateur) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Utilisateur  modifié avec succés !")
      }
    })
    this.utilisateurModal.hide();
  }


  saveUtilisateur() {
    if (this.utilisateur.id > 0)
      this.updateUtilisateur();
    else this.createUtilisateur();
  }

  reset() {
    this.utilisateur = new Utilisateur();
  }

}
