import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/Utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Profil } from '../../models/enum/Profil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UtilisateurService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');

      var list = document.getElementsByClassName('nav-item ');
      // for (let i = 0; i < list.length; i++) {
      //   list[i].classList.remove("open");
      // }

    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }


  ngOnInit() {

  }
  getProfiilDisplay(text) {
    return Profil[text]
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }
}
