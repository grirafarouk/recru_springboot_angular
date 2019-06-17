import { Profil } from './../../../models/enum/Profil';
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
  ListUtilistaeur: any[];
  ListUtilisteur2: any[];

  utilisateur: Utilisateur;
  user: Utilisateur = new Utilisateur();
  profil: any[];
  refProfil: Array<Role> = [];
  pt: number;
  verif: boolean;
  searchingverification: boolean;
  searchText;


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
    this.roleService.findAllRole().subscribe(data => {
      this.refProfil = data;
    })
  }

  searchingnewproffil(event) {
    let verif = true;
    this.user.profil.libelle = event
    if (event != null) {

      if (this.user.login != null) {
        this.utilisateurService.getAllUser().subscribe(data => {
          data.forEach(element => {

            data = data.filter(res => {
              return res.login.toLocaleLowerCase().match(this.user.login.toLocaleLowerCase());
            })

          })
          this.ListUtilistaeur = data
          this.ListUtilistaeur = this.ListUtilistaeur.filter(res => {
            return res.profil.libelle.toLocaleLowerCase().match(this.user.profil.libelle.toLocaleLowerCase());
          })
        })
        verif = false;

      }
      if (verif == true) {
        this.utilisateurService.getAllUser().subscribe(data => {
          data.forEach(element => {

            data = data.filter(res => {
              return res.profil.libelle == event;
            })

          })

          this.ListUtilistaeur = data
        })

      }


    }
    else if ((event == null) && (this.user.login != null)) {

      this.utilisateurService.searchingusers(this.user).subscribe(data => {
        this.ListUtilistaeur = data
      })
    }
    else {
      this.utilisateurService.getAllUser().subscribe(data => {
        this.ListUtilistaeur = data;
      })
    }
  }


  loginsearch() {
    let verif = true;
    if (this.user.login != null) {
      if (this.user.profil.libelle != null) {
        this.utilisateurService.getAllUser().subscribe(data => {
          data.forEach(element => {

            data = data.filter(res => {
              return res.profil.libelle == this.user.profil.libelle;
            })

          })

          this.ListUtilistaeur = data
          this.ListUtilistaeur = this.ListUtilistaeur.filter(res => {
            return res.login.toLocaleLowerCase().match(this.user.login.toLocaleLowerCase());
          })
        })

        verif = false;
      }
      if (verif == true) {
        this.utilisateurService.searchingusers(this.user).subscribe(data => {
          this.ListUtilistaeur = data
        })


      }
    }
    else {
      this.utilisateurService.getAllUser().subscribe(data => {
        this.ListUtilistaeur = data;
      })
    }
  }
  searchUser(event) {
    if (event.target.value != "") {
      this.utilisateurService.completeUser(event.target.value).subscribe(data => {
        this.ListUtilistaeur = data;
      })
    }
    else {

      this.ngOnInit();

    }

  }

  showAddModal() {
    if (this.utilisateur.id > 0) {
      this.verif = false;

    }
    else {

      this.verif = true;
    }
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
    if (this.utilisateur.id > 0) {
      this.verif = false;

    }
    else {

      this.verif = true;
    }
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
      error = true;
    }
    if (this.utilisateur.profil == undefined) {
      this.notifierService.notify("error", " Écrivez un role valide")
      error = true;
    }
    if (this.utilisateur.nom == "" || this.utilisateur.nom == undefined) {
      this.notifierService.notify("error", " Écrivez un nom valide")
      error = true;
    }
    if (this.utilisateur.prenom == "" || this.utilisateur.prenom == undefined) {
      this.notifierService.notify("error", " Écrivez un prenom valide")
      error = true;
    }
    let user
    await this.utilisateurService.getUserByEmail(this.utilisateur.email).toPromise().then(data => { user = data });;
    if (user != null && user.id != this.utilisateur.id) {
      this.notifierService.notify("error", "Email existe déjà  !")
      error = true;
    }

    await this.utilisateurService.getUserByLogin(this.utilisateur.login).toPromise().then(data => { user = data });;
    if (user != null && user.id != this.utilisateur.id) {
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
