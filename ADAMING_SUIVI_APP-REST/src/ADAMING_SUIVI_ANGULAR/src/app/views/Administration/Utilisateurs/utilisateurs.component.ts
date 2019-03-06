import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { RoleService } from "../../../services/administrationService/role.service";
import { Utilisateur } from "../../../models/Utilisateur";
import { Role } from "../../../models/Role";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'utilisateurs.component.html',
  styleUrls: ["utilisateurs.component.css"]
})
export class utilisateursComponent implements OnInit {

  @ViewChild("utilisateurModal")
  public utilisateurModal;
  ListUtilistaeur : any[];
  utilisateur: Utilisateur;
  profil: any[];
  refProfil : Array<Role> = [];





  constructor(
    private sanitizer: DomSanitizer,
    private helperService: HelperService,
    private utilisateurService: UtilisateurService,
    private notifierService: NotifierService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
    this.utilisateurService.getAllUser().subscribe(data => {
      this.ListUtilistaeur = data;
    })
    this.roleService.findAllRole().subscribe(data =>{
      this.refProfil = data;
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
    this.utilisateur = Object.assign({}, utilisateur);
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


  async saveUtilisateur() {
    let error = false;
    if (this.utilisateur.login == "" || this.utilisateur.login == undefined) {
      this.notifierService.notify("error", " Écrivez un login valide")
      error  = true;
    }
    if (this.utilisateur.profil == undefined) {
      console.log(this.utilisateur.profil);
      this.notifierService.notify("error", " Écrivez un role valide")
      error  = true;
    }
    if (this.utilisateur.nom == "" || this.utilisateur.nom == undefined) {
      this.notifierService.notify("error", " Écrivez un nom valide")
      error  = true;
    }
    if (this.utilisateur.prenom == "" || this.utilisateur.prenom == undefined) {
      this.notifierService.notify("error", " Écrivez un prenom valide")
      error  = true;
    }
    let user
    await this.utilisateurService.getUserByEmail(this.utilisateur.email).toPromise().then(data => { user = data });;
    if (user != null && user.id!=this.utilisateur.id) {
      this.notifierService.notify("error", "Email existe déjà  !")
      error = true;
    }

    await this.utilisateurService.getUserByLogin(this.utilisateur.login).toPromise().then(data => { user = data });;
    if (user != null && user.id!=this.utilisateur.id) {
      this.notifierService.notify("error", "Login existe déjà  !")
      error = true;
    }
    if (!error) {
      if (this.utilisateur.id > 0)
        this.updateUtilisateur();
      else this.createUtilisateur();
    }
  }
  
  reset() {
    this.utilisateur = new Utilisateur();
  }

}
