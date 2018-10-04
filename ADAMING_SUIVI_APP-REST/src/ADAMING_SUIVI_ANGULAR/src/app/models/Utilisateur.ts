
import { Profil } from "./enum/Profil";

export class Utilisateur{
      id:number;
	  profil:Profil;
	  nom:string;
	  prenom:string;
	  login:string;
	  email:string;
	  password:string;
	  dateCreation:Date;
	  actif:Boolean;
	  toke:string;
	  expire:Boolean;
	  dateModificationMotPasse:Date;
	  reporting:boolean;
	  numeroTelF:string;
	  numeroTelP:string;
}