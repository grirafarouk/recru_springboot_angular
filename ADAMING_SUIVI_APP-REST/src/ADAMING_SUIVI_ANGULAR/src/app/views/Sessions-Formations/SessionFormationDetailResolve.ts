import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { SessionsFormationsService } from '../../services/sessionService/sessions-formations.service';
import { SessionFormation } from '../../models/SessionFormation';
import { NAVIGATION_RULES } from '../../helper/application.constant';

@Injectable({ providedIn: 'root' })
export class SessionFormationDetailResolve implements Resolve<any> {
    constructor(private sessionFormationService:SessionsFormationsService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = +route.params['id'];
        return this.sessionFormationService.getFicheSessionFormation(id).toPromise().then((sessionFormation:SessionFormation )=> {
            if (sessionFormation) {
                return sessionFormation;
            } else { // id not found
                this.router.navigate([NAVIGATION_RULES.dashboard.url]);
                return false;
            }
        });
    }
}