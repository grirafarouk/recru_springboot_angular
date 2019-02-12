import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/Utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Profil } from '../../models/enum/Profil';
import { HelperService } from '../../helper/helper.service';
import { NAVIGATION_RULES } from '../../helper/application.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  profil = this.userService.getConnetedUserInfo().profil;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private userService: UtilisateurService,
    private helperService: HelperService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(this.element, {
      attributes: true
    });
  }

  private cleatItem(navItems) {
    var navItemsClean = [];
    navItems.forEach(element => {
      if (this.helperService.hasAccess(element, this.profil)) {
        var copy = Object.assign({}, element);
        if (copy.children != undefined) {
          copy.children = this.cleatItem(element.children);
        }
        navItemsClean.push(copy);
      }
    });
    return navItemsClean;
  }

  ngOnInit() {
    this.navItems = this.cleatItem(navItems);

  }
  getProfiilDisplay(text) {
    return Profil[text]
  }

  logout() {

    this.router.navigate(["/"+NAVIGATION_RULES.login.url])
    location.reload();

  }
}
