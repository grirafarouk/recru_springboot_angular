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
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  diableButton = false;
  login = {
    username: "",
    pwd: ""
  }

  constructor(private notifierService: NotifierService,
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private router: Router,
    private userService: UtilisateurService) { }

  ngOnInit() {
    this.authenticationService.logout()
  }
  doLogin() {
    this.diableButton = true
    this.authenticationService.login(this.login).toPromise().then(
      data => {
        if (Profil[this.userService.getConnetedUserInfo().profil] == Profil.PROFILSPECIAL)
          this.router.navigate([NAVIGATION_RULES.sessionsFormationsAcceuil.url+'/'+NAVIGATION_RULES.sessionsFormationsAcceuil.listAcceuil]);
        else if (Profil[this.userService.getConnetedUserInfo().profil] == Profil.SOURCEUR)
          this.router.navigate([NAVIGATION_RULES.candidats.url+'/'+NAVIGATION_RULES.candidats.newCancidat]);
        else
          this.router.navigate([NAVIGATION_RULES.dashboard.url])
        }, resp => {
        this.diableButton = false;
        if (resp.status == 400)
          this.notifierService.notify('error', this.helperService.decodeEntities(resp.error.error_description));
        else if (resp.status == 0)
          this.notifierService.notify('error', "Problème de connexion");
        else
          this.notifierService.notify('error', "Erreur inconnue");
      }
    )
  }


 private redirectForgetPwd(){
  this.router.navigate([NAVIGATION_RULES.forgetpwd.url])
  }
}
