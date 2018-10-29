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
  @ViewChild("utilisateurAddModal")
  public utilisateurAddModal;
  @ViewChild("utilisateurEditModal")
  public utilisateurEditModal;
  ListUtilistaeur=[]
  utilisateur:Utilisateur
  refProfil = this.helperService.buildProfilArray();

  constructor(
   private sanitizer: DomSanitizer,
   private helperService:HelperService,
   private utilisateurService: UtilisateurService,
   private notifierService: NotifierService

    ){}

  ngOnInit(): void {
    this.utilisateur=new Utilisateur();
    this.utilisateurService.getAllUser().subscribe(data=>{
      this.ListUtilistaeur = data;
    })
  }

  showAddModal(){
    this.reset();
    this.utilisateurAddModal.show();
  }

  saveUtilisateur(){
    this.utilisateurService.save(this.utilisateur).toPromise().then((data: Utilisateur) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Utilisateur ajouté avec succés !")
      }
    })
    this.utilisateurAddModal.hide();
  }

  showEditModal(utilisateur: any){
    this.utilisateur.id = utilisateur.id;
    this.utilisateur.profil = utilisateur.profil;
    this.utilisateur.nom = utilisateur.nom;
    this.utilisateur.prenom = utilisateur.prenom;
    this.utilisateur.numeroTelF = utilisateur.numeroTelF;
    this.utilisateur.numeroTelP = utilisateur.numeroTelP;
    this.utilisateur.email = utilisateur.email;
    this.utilisateur.actif = utilisateur.actif;
    this.utilisateur.reporting = utilisateur.reporting;
    this.utilisateurEditModal.show();

  }

  updateUtilisateur(utilisateur){
    this.utilisateurService.update(this.utilisateur).toPromise().then((data: Utilisateur) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Utilisateur  modifié avec succés !")
      }
    })
    this.utilisateurEditModal.hide();
  }
  

  reset(){
    this.utilisateur.profil = null;
    this.utilisateur.nom = null;
    this.utilisateur.prenom = null;
    this.utilisateur.numeroTelF = null;
    this.utilisateur.numeroTelP = null;
    this.utilisateur.email = null;
    this.utilisateur.actif = null;
    this.utilisateur.reporting = null;
  }

}
