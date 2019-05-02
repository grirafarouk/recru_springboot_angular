import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { HelperService } from '../../../helper/helper.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { NAVIGATION_RULES } from '../../../helper/application.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset-pwd.component.html',
  styleUrls: ["reset-pwd.component.css"]

})
export class RestPwdComponent implements OnInit {

  diableButton = false;
  pwd;
  pwdConfirm
  token
  constructor(private notifierService: NotifierService,
     private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout()
    this.token= this.route.snapshot.queryParamMap.get("token")

  }

  resetPwd() {
    this.diableButton = true
    let error = false;
    if(this.pwd.length<4){
      error= true;
      this.notifierService.notify('error',"Le mot de passe doit etre superieure ou égale à 4");
      this.diableButton = false;
    }
    if(this.pwd != this.pwdConfirm){
      error= true;
      this.notifierService.notify('error',"Ces mots de passes ne correspondent pas.");
      this.diableButton = false;
    }
    if (!error) {
      this.authenticationService.resetPwd({ pwd: this.pwd, token: this.token }).toPromise().then(
        data => {
            this.router.navigate([NAVIGATION_RULES.login.url])
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
  }

   retour() {
    this.router.navigate([NAVIGATION_RULES.login.url])
  }
}
