import { Injectable } from "@angular/core";
import { Disponibilite } from "../models/enum/Disponibilite";
import { Status } from "../models/enum/Status";
import { Profil } from "../models/enum/Profil";
import { Candidate } from "../models/Candidate";
import { Competence } from "../models/Competence";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { UtilisateurService } from "../services/utilisateur.service";
import { HelperService } from "./helper.service";


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
        let profil = this.userService.getConnetedUserInfo().profil;
        if (state.url.indexOf('/details/') > 0) return Profil[profil] != Profil.SOURCEUR;
        return this.helperService.hasAccessByUrl(state.url, profil);
    }
}