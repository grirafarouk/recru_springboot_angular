import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { CandidatsService } from '../../../services/candidats.service';
import { Candidate } from '../../../models/Candidate';

@Injectable({ providedIn: 'root' })
export class CandidatDetailResolve implements Resolve<any> {
    constructor(private candidatService:CandidatsService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = +route.params['id'];
        return this.candidatService.getCandidatById(id).toPromise().then((candidat:Candidate )=> {
            if (candidat) {
                return candidat;
            } else { // id not found
                this.router.navigate(['/dashborad']);
                return false;
            }
        });
    }
}