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
	  actif:boolean;
	  toke:string;
	  expire:boolean;
	  dateModificationMotPasse:Date;
	  reporting:boolean;
	  numeroTelF:string;
	  numeroTelP:string;
}