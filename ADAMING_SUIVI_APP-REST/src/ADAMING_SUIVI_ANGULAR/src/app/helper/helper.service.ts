import { Injectable } from "@angular/core";
import { Disponibilite } from "../models/enum/Disponibilite";


@Injectable({
    providedIn: 'root'
})
export class HelperService {

    public buildDisponibiliteArray(): Object[] {
        return Object.keys(Disponibilite)
            .map(key => ({ label: Disponibilite[key], value: key }))
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
}