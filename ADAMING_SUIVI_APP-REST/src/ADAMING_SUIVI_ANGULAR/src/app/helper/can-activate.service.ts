import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { UtilisateurService } from "../services/utilisateur.service";
import { HelperService } from "./helper.service";
import { USER_ROLE } from "./application.constant";
@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    constructor(private userService: UtilisateurService, private helperService: HelperService) {
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let role = this.userService.getConnetedUserInfo().profil.libelle;
        if (state.url.indexOf('/details/') > 0) return role != USER_ROLE.SOURCEUR;
        return this.helperService.hasAccessByUrl(state.url, role);
    }
}