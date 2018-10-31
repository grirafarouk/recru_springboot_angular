import { Utilisateur } from "./Utilisateur";
import { Region } from "./region";

export class Suivi{
      id;
	  charge:Utilisateur;
	  mobilite:boolean;
	  relance:boolean;
	  anglais:number ;
	  dateRelance:Date;
	  notePresentation:number;
	  noteSavoir:number;
	  noteFiabilite:number;
	  noteAttrait:number;
	  notePret:number;
	  noteMobilite:number;
	  noteResultat:number;
	  noteCoherence:number;
	  notePistes:number;
	  commentaire:String;
	  regions:Array<Region >;
}