import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { SessionsFormationsService } from '../../services/sessionService/sessions-formations.service';
import { SessionFormation } from '../../models/SessionFormation';
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { AuthenticationService } from '../../services/authentication.service';
import { HelperService } from '../../helper/helper.service';

@Injectable({ providedIn: 'root' })
export class TokenResolve implements Resolve<any> {
    constructor(private authenticationService: AuthenticationService, private router: Router, private helperService: HelperService) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let token = route.queryParamMap.get("token")
        return this.authenticationService.getRestPWDTokenState(token).toPromise().then((data: any) => {
            if (data && data.result == "success") {
                return data.token;
            } else {
                if (data && data.result == "error") this.helperService.errorMsg = data.errorMsg
                this.router.navigate([NAVIGATION_RULES.error500.url]);
                return false;
            }
        });
    }
}