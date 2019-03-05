import { Role } from "./Role";

export class Utilisateur{
      id:number;
	  profil:Role = new Role();
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