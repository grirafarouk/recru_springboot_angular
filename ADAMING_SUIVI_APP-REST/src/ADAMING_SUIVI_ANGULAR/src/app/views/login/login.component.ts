import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  diableButton= false;
  login = {
    username: "",
    pwd: ""
  }

  constructor(private notifierService: NotifierService,private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout()
  }
  setUser(){

  }
  doLogin() {
    this.diableButton=true
    this.authenticationService.login(this.login).subscribe(
      data => {
        this.diableButton=false;
        this.router.navigate(['/dashboard'])
      },error=>{
        this.diableButton=false;
        this.notifierService.notify( 'error', error.error.error_description );
      }
    )
  }
}
