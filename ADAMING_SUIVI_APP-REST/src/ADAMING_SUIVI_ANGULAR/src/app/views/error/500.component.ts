import { Component } from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';
import { Router } from '@angular/router';

@Component({
  templateUrl: '500.component.html'
})
export class P500Component {
  errorMsg
  constructor(private helperService:HelperService,    private router: Router   ) {
    this.errorMsg = this.helperService.errorMsg =="" ? "The page you are looking for is temporarily unavailable" : this.helperService.errorMsg;

   }
   retour(){
    this.router.navigate([NAVIGATION_RULES.dashboard.url])
   }
}
