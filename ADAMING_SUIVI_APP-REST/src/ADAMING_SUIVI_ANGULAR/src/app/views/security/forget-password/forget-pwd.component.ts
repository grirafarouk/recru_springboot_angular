import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { HelperService } from '../../../helper/helper.service';
import { Profil } from '../../../models/enum/Profil';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { NAVIGATION_RULES } from '../../../helper/application.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forget-pwd.component.html',
  styleUrls: ["forget-pwd.component.css"]

})
export class ForgetPwdComponent implements OnInit {

  diableButton = false;
  email

  constructor(private notifierService: NotifierService,
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private router: Router,
    private userService: UtilisateurService) { }

  ngOnInit() {
    this.authenticationService.logout()
  }

  forgetPwd() {
    this.diableButton = true
    this.authenticationService.forgetPwd(this.email).toPromise().then(
      data => {
        this.diableButton = false;
        if (data.result == "success")
          this.notifierService.notify('success', "Un e-mail a été envoyé à l'adresse " +this.email
          							+ ", il contient un lien sur lequel il vous faudra cliquer afin de réinitialiser votre mot de passe.");
        else 
          this.notifierService.notify('error', data.errorMsg);
      }, error => {
        this.diableButton = false;
        if (error.status == 400)
          this.notifierService.notify('error', this.helperService.decodeEntities(error.error.error_description));
        else if (error.status == 0)
          this.notifierService.notify('error', "Problème de connexion");
        else
          this.notifierService.notify('error', "Erreur inconnue");
      }
    )
  }

 private retour(){
  this.router.navigate([NAVIGATION_RULES.login.url])
  }
}
