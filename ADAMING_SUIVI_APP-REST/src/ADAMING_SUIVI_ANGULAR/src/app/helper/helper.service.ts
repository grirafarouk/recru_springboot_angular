import { Injectable } from "@angular/core";
import { Disponibilite } from "../models/enum/Disponibilite";
import { Status } from "../models/enum/Status";
import { Profil } from "../models/enum/Profil";
import { Candidate } from "../models/Candidate";
import { Competence } from "../models/Competence";
import { navItems } from "../_nav";
import { Observable } from "rxjs";
import { CandidateDto } from "../views/candidats/CandidateDto";


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  listNouveauxCandidatRecherche:CandidateDto=new CandidateDto();
  listTousCandidatRecherche:CandidateDto=new CandidateDto();
  listRelanceCandidatRecherche:CandidateDto=new CandidateDto();
  
  errorMsg:string=""

  public buildDisponibiliteArray(): Object[] {
    return Object.keys(Disponibilite)
      .map(key => ({ label: Disponibilite[key], value: key }))
  }

  public buildProfilArray(): Object[] {
    return Object.keys(Profil)
      .map(key => ({ label: Profil[key], value: key }))
  }

  public buildStatutArray(): Object[] {
    return Object.keys(Status)
      .map(key => ({ label: Status[key], value: key }))
  }


  public formatTime(date) {
    let timeTab = date.toLocaleTimeString("fr-FR", { timeZone: 'Europe/Brussels' }).split(':');
    timeTab.pop()
    return timeTab.join(':')
  }

  public getClearString(text: string) {
    if (text != "" && text != null && text != undefined)
      text = text.replace("ç", "c").replace("à", "a")
        .replace("á", "a").replace("â", "a").replace("ã", "a").replace("ä", "a")
        .replace("å", "a").replace("æ", "ae").replace("è", "e").replace("é", "e")
        .replace("ê", "e").replace("ë", "e").replace("ì", "i").replace("í", "i")
        .replace("î", "i").replace("ï", "i").replace("ð", "o").replace("ñ", "n")
        .replace("ò", "o").replace("ó", "o").replace("ô", "o").replace("õ", "o")
        .replace("ö", "o").replace("ù", "u").replace("ú", "u").replace("û", "u")
        .replace("ü", "u").replace("ý", "y");
    return text;
  }


  public compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public generatePages(currentPage, maxPages, nbPagesAffiche?) {
    nbPagesAffiche = nbPagesAffiche == null ? 10 : nbPagesAffiche;
    let pages = []
    if (maxPages <= nbPagesAffiche) {
      for (let index = 1; index <= maxPages; index++) {
        pages.push(index);
      }
      return pages;
    }
    if (currentPage <= Math.floor(nbPagesAffiche / 2)) {
      for (let index = 1; index <= nbPagesAffiche; index++) {
        pages.push(index);
      }
      return pages;
    }
    let dif = maxPages - currentPage;
    if (dif == 0) {
      for (let index = maxPages - nbPagesAffiche + 1; index <= maxPages; index++) {
        pages.push(index);
      }
      return pages;
    }
    if (dif > Math.floor(nbPagesAffiche / 2)) {
      for (let index = currentPage - Math.floor(nbPagesAffiche / 2); index <= currentPage + Math.floor(nbPagesAffiche / 2); index++) {
        pages.push(index);
      }
      return pages;
    }
    if (dif <= Math.floor(nbPagesAffiche / 2)) {
      for (let index = currentPage - (nbPagesAffiche - dif - 1); index < currentPage + dif + 1; index++) {
        pages.push(index);
      }
      return pages;
    }
  }

  public generateComp(candidat: Candidate, competences) {
    candidat.candidatCompetence = new Array<Competence>();
    competences.forEach((obj, i) => {
      if (obj.selected) {
        //delete obj.selected;
        candidat.candidatCompetence.push(obj);
      }
    });
  }

  public decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    var value = textArea.value;
    textArea.remove()
    return value;
  }

  public hasAccess(item, profil) {
    if (item.profils == undefined)
      return true;
    else {
      if (item.profils.indexOf(Profil[profil]) == -1)
        return false;
      else return true;
    }
  }

  public findNavItemByUrl(url) {
    var elementFound = {};
    navItems.forEach(element => {
      if (element.url != undefined && element.url == url) {
        elementFound = element;
      }
      else if (element.children != undefined) {
        var childs = element.children;
        for (let i = 0; i < childs.length; i++) {
          if (childs[i].url != undefined && url == childs[i].url) {
            elementFound = childs[i];
          }
        }
        
      }
    });
    return elementFound;
  }


  hasAccessByUrl(url: string, profil: any): boolean {
    var item = this.findNavItemByUrl(url);
    return this.hasAccess(item, profil)
  }

  public getAge(birthDate):number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}